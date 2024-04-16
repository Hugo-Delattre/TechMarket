<?php

namespace App\Tests;
use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class OrderControllerTest extends ApiTestCase
{
    public function testGetOne(): void
    {
        $response = static::createClient()->request('GET', '/api/products/2');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains('{
            "id": 1,
            "totalPrice": 1999.0,
            "creationDate": "2024-04-16T11:26:09+02:00",
            "products": [
              {
                "id": 1,
                "name": "Keyboard",
                "description": "Ergonomic and stylish!",
                "photo": "keyboard.jpg",
                "price": 1999.0
              }
            ]
          }');
    }
    public function testGetAll(): void
    {
        $response = static::createClient()->request('GET', '/api/products');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains('{"id": 1,
        "totalPrice": 1999.0,
        "creationDate": "2024-04-16T11:26:09+02:00",
        "products": [
          {
            "id": 1,
            "name": "Keyboard",
            "description": "Ergonomic and stylish!",
            "photo": "keyboard.jpg",
            "price": 1999.0
          }
        ]
      },{"id": 2,
        "totalPrice": 1999.0,
        "creationDate": "2024-04-16T11:26:09+02:00",
        "products": [
          {
            "id": 2,
            "name": "Mouse",
            "description": "Ergonomic and stylish!",
            "photo": "mouse.jpg",
            "price": 1999.0
          }
        ]
      }');
    }
    public function testNew(): void
    {
        $response = static::createClient()->request('POST', '/api/products','','','','{
        "totalPrice": 1999.0,
        "products": [
          {
            "id": 2,
            "name": "Mouse",
            "description": "Ergonomic and stylish!",
            "photo": "mouse.jpg",
            "price": 1999.0
          }
        ]
      }');

        $this->assertResponseIsSuccessful();
    }
    public function testUpdate(): void
    {
        $response = static::createClient()->request('POST', '/api/products','','','','{
            "totalPrice": 1999.0,
            "creationDate": "2024-04-16T11:26:09+02:00",
            "products": [
              {
                "id": 2,
                "name": "Mouse",
                "description": "Ergonomic and stylish!",
                "photo": "mouse.jpg",
                "price": 1999.0
              }
            ]
          }');

        $this->assertResponseIsSuccessful();
    }
    public function testDelete(): void
    {
        $response = static::createClient()->request('POST', '/api/products','','','','{
            "id": "3');

        $this->assertResponseIsSuccessful();
    }
}
