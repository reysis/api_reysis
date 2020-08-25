<?php

namespace App\Test\Functional;

use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class UserResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;
    public function testCreateUser(){
        $client = self::createClient();

        //Testeando peticion incorrecta
        $client->request('POST', '/api/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [],
        ]);
        $this->assertResponseStatusCodeSame(400);
        
        //Testeando que se pueda crear un usuario normalmente
        $this->createTipoUsuario('Empresa');
        $client->request('POST', '/api/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username' => 'testUser',
                'password' => 'foo',
                'tipoUsuario' => '/api/tipo_usuarios/1'
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);

        //Testeando que no se pueda crear un usuario de un tipo inexistente
        $client->request('POST', '/api/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username' => 'testUser',
                'password' => 'foo',
                'tipoUsuario' => '/api/tipo_usuarios/3'
            ],
        ]);
        $this->assertResponseStatusCodeSame(400);
    }
}