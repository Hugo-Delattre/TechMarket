<?php

namespace App\Controller;

use App\Entity\Order;
use App\Form\OrderType;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Product;
use App\Serializer\MyCustomOrderNormalizer;
#[Route('/api/orders')]
class OrderController extends AbstractController
{

    #[Route('/', name: 'app_order_index', methods: ['GET'])]
    public function index(OrderRepository $orderRepository, SerializerInterface $serializer): JsonResponse
    {
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($orderRepository->findAll(), 'json', $context));
    }

    #[Route('/', name: 'app_order_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager,SerializerInterface $serializer): JsonResponse
    {
        $order = new Order();
        $content = json_decode($request->getContent(), true);
        $products = array();
        foreach ($content["productsId"] as $value) {
            $product = $entityManager->getRepository(Product::class)->findOneById($value["id"]);
            array_push($products,$product);
            
        }
        foreach($products as $product){
            $order->addProduct($product);
            $product->addOrder($order);
            $order->setTotalPrice($order->getTotalPrice()+$product->getPrice());
        }
        
        $order->setCreationDate(new \DateTime());
        $entityManager->persist($order);
        $entityManager->flush();
        $context = (new ObjectNormalizerContextBuilder())
                ->withGroups('api')
                ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($order, 'json', $context));
    }
    
    #[Route('/{id}', name: 'app_order_show', methods: ['GET'])]
    public function show(Order $order,SerializerInterface $serializer): Response
    {
        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('api')
            ->toArray();
        return JsonResponse::fromJsonString($serializer->serialize($order, 'json', $context));
    
    }

    #[Route('/{id}/edit', name: 'app_order_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Order $order, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(OrderType::class, $order);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_order_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('order/edit.html.twig', [
            'order' => $order,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_order_delete', methods: ['POST'])]
    public function delete(Request $request, Order $order, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $order->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($order);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_order_index', [], Response::HTTP_SEE_OTHER);
    }
}
