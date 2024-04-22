<?php

namespace App\Tests;

class ProductControllerTest extends ApiTestCase
{
    public function testGetOne(): void
    {
        $response = static::createClient()->request('GET', '/api/products/2');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains('{
            "id": 2,
            "name": "Keyboard",
            "description": "Ergonomic and stylish!",
            "photo": "keyboard.jpg",
            "price": 1999.0
          }');
    }
    public function testGetAll(): void
    {
        $response = static::createClient()->request('GET', '/api/products');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains('{
            "id": 1,
            "name": "Mouse",
            "description": "Ergonomic and stylish!",
            "photo": "mouse.jpg",
            "price": 999.0
          },{
            "id": 2,
            "name": "Keyboard",
            "description": "Ergonomic and stylish!",
            "photo": "keyboard.jpg",
            "price": 1999.0
          }');
    }
    public function testNew(): void
    {
        $response = static::createClient()->request('POST', '/api/products','','','','{
            "name": "headset",
            "description": "Ergonomic and stylish again!",
            "photo": "headset.jpg",
            "price": 102.0
          }');

        $this->assertResponseIsSuccessful();
    }
    public function testUpdate(): void
    {
        $response = static::createClient()->request('POST', '/api/products','','','','{
                "id": 1,
                "name": "Mouse v2",
                "description": "Ergonomic and stylish the comeback!",
                "photo": "mousev2.jpg",
                "price": 993.0
              })');

        $this->assertResponseIsSuccessful();
    }
    public function testDelete(): void
    {
        $response = static::createClient()->request('POST', '/api/products','','','','{
            "id": "3');

        $this->assertResponseIsSuccessful();
    }
}
