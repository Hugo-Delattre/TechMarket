<?php

namespace App\DataFixtures;

use App\Entity\Order;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $product = new Product();
        $product->setName('Keyboard')
            ->setPrice(199.9)
            ->setDescription('Ergonomic and stylish!')
            ->setPhoto('keyboard.jpg');
        $manager->persist($product);
        $product = new Product();
        $product->setName('mouse')
            ->setPrice(50)
            ->setDescription('Ergonomic and stylish as his brother!')
            ->setPhoto('mouse.jpg');
        $manager->persist($product);
        $manager->flush();

        $order = new Order();
        $order->addProduct($product)
            ->setTotalPrice(1999)
            ->setCreationDate(new \DateTime());
        $manager->persist($order);
        $manager->flush();

        $user = new User();
        $user->setEmail('arthur.test@gmail.com')
            ->setLogin('arthurito')
            ->setPassword('password')
            ->setRoles(['ROLE_USER'])
            ->setFirstname('Arthur')
            ->setLastname('Test');

        $manager->persist($user);
        $manager->flush();

    } 
}
