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
use App\Utils\SchemeInsertOrder;
use OpenApi\Attributes\Schema;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;

#[Route('api')]
class CartController extends AbstractController
{
    #[Route('/carts/{productId}', name: 'app_cart', methods: ['POST', 'DELETE'])]
    #[OA\Response(
        response: 200,
        description: 'returned if product is available too add in cart'
    )]
    public function index(EntityManagerInterface $entityManager, int $productId, ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $product = $productRepository->findOneById($productId);
        $currentOrder = null;
        if ($product) {
            //TODO: set current user
            $currentUser = $entityManager->find(User::class, 2);
            //case of first order (0 order paid or not)
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

    #[Route('/carts/validate', name: 'app_order_new', methods: ['POST'])]
    #[OA\Response(
        response: 200,
        description: 'post new order',
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Object::class,
            example: [
                "productsId" => [["id" => "7", "quantity" => 2], ["id" => "8", "quantity" => 2], ["id" => "9", "quantity" => 1]]
            ]
        )
    )]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $order = new Order();
        $content = json_decode($request->getContent(), true);
        foreach ($content["productsId"] as $value) {
            $product = $entityManager->getRepository(Product::class)->findOneById($value["id"]);
            for ($i = 0; $i < $value["quantity"]; $i++) {
                $order->addProduct($product);
            }
        }

        $order->setCreationDate(new \DateTime());
        $order->setCustomer($entityManager->find(User::class, 1));
        $entityManager->persist($order);
        $entityManager->flush();
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($order, 'json', $context));
    }
}
