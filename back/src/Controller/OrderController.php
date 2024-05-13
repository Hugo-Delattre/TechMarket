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
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use PHPUnit\Util\Json;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

use Symfony\Component\Security\Core\Security;


#[Route('/api/orders')]
class OrderController extends AbstractController
{


    #[Route('/', name: 'app_order_index', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'retrieve all orders'
    )]
    public function index(UserRepository $userRepository, Request $request, EntityManagerInterface $entityManager, OrderRepository $orderRepository, SerializerInterface $serializer): Response
    {
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        //TODO: change for the current user
        $token = $request->headers->get('Authorization');
        $tokenParts = explode(".", $token);
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $user = $userRepository->findOneBy(['login' => $jwtPayload->login]);
        return JsonResponse::fromJsonString($serializer->serialize($orderRepository->findAllByUserId($user->getId()), 'json', $context));
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
