<?php

namespace App\Controller;

use App\Entity\User;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Lexik\Bundle\JWTAuthenticationBundle\LexikJWTAuthenticationBundle;

#[Route('/api')]
class ApiLoginController extends AbstractController
{
    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function index(#[CurrentUser] ?User $user, Security $security, SerializerInterface $serializer): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }
        $security->login($user);
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($user, 'json', $context));
    }
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = new User();
        $content = json_decode($request->getContent(), true);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $content["password"]
            )
        );
        $user->setEmail($content["email"]);
        $user->setRoles(["ROLE_USER"]);
        $user->setLastname($content["lastName"]);
        $user->setFirstname($content["firstName"]);
        $user->setLogin($content["login"]);
        $entityManager->persist($user);
        $entityManager->flush();

        // do anything else you need here, like send an email

        return $security->login($user, 'json_login', 'login');
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ApiLoginController.php',
        ]);
    }
    #[Route('/users', name: 'update_user', methods: ['PUT'])]
    public function updateUser(Request $request, UserPasswordHasherInterface $userPasswordHasher,  SerializerInterface $serializer,  ValidatorInterface $validator, EntityManagerInterface $entityManager): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $user = $this->getUser();
        $user->setLastname($content["lastName"]);
        $user->setFirstname($content["firstName"]);
        $user->setEmail($content["email"]);
        // $user->setPassword(
        //     $userPasswordHasher->hashPassword(
        //         $user,
        //         $content["password"]
        //     )
        // );
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $error_message = new Response((string) $errors, 400);
            return $this->json($error_message);
        } else {

            $entityManager->persist($user);
            $entityManager->flush();
            $context = (new ObjectNormalizerContextBuilder())
                ->withGroups('api')
                ->toArray();
            return JsonResponse::fromJsonString($serializer->serialize($user, 'json', $context));
        }
    }
    #[Route('/users', name: 'get_user', methods: ['GET'])]
    public function getCurrentUser(SerializerInterface $serializer): Response
    {
        $user = $this->getUser();
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($user, 'json', $context));
    }
}
