<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\User;
use App\Form\OrderType;
use App\Repository\OrderRepository;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use OpenApi\Attributes as OA;

#[Route('/api/orders')]
class OrderController extends AbstractController
{


    #[Route('/', name: 'app_order_index', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'retrieve all orders'
    )]
    public function index(EntityManagerInterface $entityManager, OrderRepository $orderRepository, SerializerInterface $serializer): Response
    {
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        //TODO: change for the current user
        return JsonResponse::fromJsonString($serializer->serialize($orderRepository->findAllByUserId(1), 'json', $context));
    }

    #[Route('/{id}', name: 'app_order_show', methods: ['GET'])]
    public function show(Order $order, SerializerInterface $serializer): Response
    {
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($order, 'json', $context));
    }

    #[Route('/{id}', name: 'app_order_delete', methods: ['DELETE'])]
    public function delete(Request $request, int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $order = $entityManager->find(Order::class, $id);
        if ($order) {
            $entityManager->remove($order);
            $entityManager->flush();
            return new JsonResponse(['message' => 'Order deleted']);
        }
        return new JsonResponse(["message" => "Eror while deleting"], 400);
    }
}
