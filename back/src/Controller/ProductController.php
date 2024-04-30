<?php

namespace App\Controller;

use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('api/products')]
class ProductController extends AbstractController
{
    #[Route('/', name: 'app_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($productRepository->findAll(), 'json', $context));
    }

    #[Route('/', name: 'app_product_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        $product = new Product();
        $content = json_decode($request->getContent(), true);
        $product->setName($content["name"]);
        $product->setDescription($content["description"]);
        $product->setPhoto($content["photo"]);
        $product->setPrice($content["price"]);
        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            $error_message = new Response((string) $errors, 400);
            return new JsonResponse($error_message);
        } else {

            $entityManager->persist($product);
            $entityManager->flush();
            $context = (new ObjectNormalizerContextBuilder())
                ->withGroups('api')
                ->toArray();
            return JsonResponse::fromJsonString($serializer->serialize($product, 'json', $context));
        }
        return new JsonResponse('"Error": "bad Input for new product"');
    }

    #[Route('/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product, SerializerInterface $serializer): Response
    {
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($product, 'json', $context));
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($product, 'json', $context));
    }

    #[Route('/{id}', name: 'app_product_edit', methods: ['PUT'])]
    public function edit(Request $request, Product $product, EntityManagerInterface $entityManager, SerializerInterface $serializer,  ValidatorInterface $validator): Response
    {
        $content = json_decode($request->getContent(), true);
        $product->setName($content["name"]);
        $product->setDescription($content["description"]);
        $product->setPhoto($content["photo"]);
        $product->setPrice($content["price"]);
        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            $error_message = new Response((string) $errors, 400);
            return $this->json($error_message);
        } else {

            $entityManager->persist($product);
            $entityManager->flush();
            $context = (new ObjectNormalizerContextBuilder())
                ->withGroups('api')
                ->toArray();
            return JsonResponse::fromJsonString($serializer->serialize($product, 'json', $context));
        }
        //TODO: better error message
        return $this->json('"Error": "bad Input for new product"');
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($product, 'json', $context));
    }

    #[Route('/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Request $request, int $id, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        if ($product = $entityManager->getRepository(Product::class)->find($id)) {
            $entityManager->remove($product);
            $entityManager->flush();
            return new Response(json_encode(['message' => 'Product deleted']), Response::HTTP_OK);
        }
        return new Response(json_encode(['message' => 'error']), Response::HTTP_BAD_REQUEST);
    }
}
