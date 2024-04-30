<?php

namespace App\Controller;

use App\Entity\Product;
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

#[Route('api')]
class CartController extends AbstractController
{
    #[Route('/carts/{productId}', name: 'app_cart', methods: ['POST', 'DELETE'])]
    #[OA\Response(
        response: 200,
        description: 'returned if product is available too add in cart'
    )]
    public function index(int $id, ProductRepository $productRepository): JsonResponse
    {
        //TODO: check if product exist
        return $this->json($productRepository->findOneById($id));
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
                "productsId" => [["id" => "7"], ["id" => "8"], ["id" => "9"]]
            ]
        )
    )]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $order = new Order();
        $content = json_decode($request->getContent(), true);
        $products = array();
        foreach ($content["productsId"] as $value) {
            $product = $entityManager->getRepository(Product::class)->findOneById($value["id"]);
            array_push($products, $product);
        }
        foreach ($products as $product) {
            $order->addProduct($product);
            $product->addOrder($order);
            $order->setTotalPrice($order->getTotalPrice() + $product->getPrice());
        }

        $order->setCreationDate(new \DateTime());
        $entityManager->persist($order);
        $entityManager->flush();
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($order, 'json', $context));
    }
}
