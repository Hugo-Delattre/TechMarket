<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\User;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use OpenApi\Attributes as OA;
use phpDocumentor\Reflection\Types\Integer;
use App\Entity\Order;
use App\Repository\OrderRepository;
use App\Utils\SchemeInsertOrder;
use OpenApi\Attributes\Schema;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;

#[Route('api')]
class CartController extends AbstractController
{
    #[Route('/carts/{productId}', name: 'app_cart', methods: ['POST'])]
    #[OA\Response(
        response: 200,
        description: 'returned if product is available too add in cart'
    )]
    public function index(EntityManagerInterface $entityManager, int $productId, ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $product = $productRepository->findOneById($productId);
        $currentOrder = null;
        if ($product) {
            $currentUser = $this->getUser();
            if ($currentUser->getOrders()->count() < 1) {
                $currentOrder = new Order();
                $currentOrder->setCustomer($currentUser);
                $currentOrder->setTotalPrice(0);
            }
            //Customer already have an order in db 
            else {
                foreach ($currentUser->getOrders() as $order) {
                    if ($order->isOrdered() == false) {
                        $currentOrder = $order;
                        break;
                    } else {
                        $currentOrder = new Order();
                        $currentOrder->setCustomer($currentUser);
                        $currentOrder->setTotalPrice(0);
                    }
                }
            }

            $currentOrder->addProduct($product);
            $currentOrder->setTotalPrice($currentOrder->getTotalPrice() + $product->getPrice());
            $currentOrder->setCreationDate(new \DateTime());
            $entityManager->persist($currentOrder);
            $entityManager->flush();
            $context = (new ObjectNormalizerContextBuilder())
                ->withGroups('api')
                ->toArray();
            return JsonResponse::fromJsonString($serializer->serialize($currentOrder, 'json', $context));
        };
        return $this->json(['error' => 'Product not found'], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/carts/{productId}', name: 'app_cart_remove', methods: ['DELETE'])]
    #[OA\Response(
        response: 200,
        description: 'returned if product is available too remove from cart'
    )]
    public function remove(EntityManagerInterface $entityManager, int $productId, ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $product = $productRepository->findOneById($productId);
        $currentOrder = null;
        if ($product) {
            //TODO: set current user
            $currentUser = $this->getUser();
            if ($currentUser->getOrders()->count() < 1) {
                return $this->json(['error' => '0 order found'], Response::HTTP_BAD_REQUEST);
            }
            //Customer already have an order in db 
            else {
                foreach ($currentUser->getOrders() as $order) {
                    if ($order->isOrdered() == false) {
                        $currentOrder = $order;
                        break;
                    }
                }
            }
            if ($currentOrder == null) {
                return $this->json(['error' => 'No order found'], Response::HTTP_BAD_REQUEST);
            }
            if ($currentOrder->getProducts()->contains($product) == false) {
                return $this->json(['error' => 'Product not found in cart'], Response::HTTP_BAD_REQUEST);
            } else {
                $currentOrder->removeProduct($product);
                $currentOrder->setTotalPrice($currentOrder->getTotalPrice() - $product->getPrice());
                $currentOrder->setCreationDate(new \DateTime());
                $entityManager->persist($currentOrder);
                $entityManager->flush();
            }
            $context = (new ObjectNormalizerContextBuilder())
                ->withGroups('api')
                ->toArray();
            return JsonResponse::fromJsonString($serializer->serialize($currentOrder, 'json', $context));
        };
        return $this->json(['error' => 'Product not found'], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/cart/validate', name: 'app_order_new', methods: ['POST'])]
    #[OA\Response(
        response: 200,
        description: 'validate the cart and return the payment url',
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Object::class,
            example: [
                "orderId" =>  "7",
                "success_url" => "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            ]
        )
    )]
    public function new(Request $request, EntityManagerInterface $entityManager, OrderRepository $orderSymfony): JsonResponse
    {
        $stripe = new \Stripe\StripeClient($_ENV['STRIPE_SECRET']);
        $data = json_decode($request->getContent(), true);
        $order = $orderSymfony->findById($data['orderId']);
        $line_items = [];
        foreach ($order->getProducts() as $product) {
            $orderLine = [];
            $stripeProduct = $stripe->products->retrieve($product->getId(), []);
            $stripePrice = $stripe->prices->retrieve($stripeProduct['default_price'], []);
            $orderLine['price'] = $stripePrice['id'];
            $orderLine['quantity'] = 1;
            array_push($line_items, $orderLine);
        }
        $paymentData = $stripe->checkout->sessions->create([
            'line_items' => [$line_items],
            'mode' => 'payment',
            'success_url' => $data['success_url'],
        ]);

        return new JsonResponse(["payment_url" => $paymentData['url']]);
    }
}
