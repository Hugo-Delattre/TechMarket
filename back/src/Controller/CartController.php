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
#[Route('api')]
class CartController extends AbstractController
{
    #[Route('/carts/{productId}', name: 'app_cart', methods: ['POST','DELETE'])]
    public function index(int $id,ProductRepository $productRepository): JsonResponse
    {
        //TODO: check if product exist
        return $this->json($productRepository->findOneById($id));
    }
}
