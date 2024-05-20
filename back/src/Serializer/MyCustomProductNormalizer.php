<?php

namespace App\Serializer;

use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use App\Entity\Order;

class MyCustomProductNormalizer implements ContextAwareNormalizerInterface
{
    public function supportsNormalization($data, $format = null, array $context = []): bool
    {
        return $data instanceof Order && isset($context['groups']) && in_array('api', $context['groups']);
    }

    public function normalize($object, $format = null, array $context = [])
    {
        $products = array();
        foreach ($object->getProducts() as $product) {

            array_push($products, [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice()
            ]);
        }
        $json = [
            'id' => $object->getId(),
            'totalPrice' => $object->getTotalPrice(),
            'creationDate' => $object->getCreationDate(),
            'products' => $products
        ];
        return $json;
    }

    public function getSupportedTypes(): array
    {
        return [Order::class];
    }
}
