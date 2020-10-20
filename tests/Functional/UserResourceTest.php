<?php

namespace App\Test\Functional;

use App\Entity\User;
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
                'telephone' => '123456789',
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

    public function testGetUser(){
        $client = self::createClient();
        $tipo = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUserAndLogin($client, 'testUser1', 'foo', '123456789',$tipo);
        $em = $this->getEntityManager();

        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertJsonContains([
            'username' => 'testUser1'
        ]);

        $data = $client->getResponse()->toArray();
        $this->assertArrayNotHasKey('telephone',$data);
        
        //Refrescando el usuario y dandole permisos de administración
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();
        //Reloguenado para que Symfony note los permisos de administración
        $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertJsonContains([
            'telephone' => '123456789'
        ]);
    }

    public function testUpdateUser()
    {
        $client = self::createClient();
        $tipo = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUserAndLogin($client, 'testUser1', 'foo','123456789', $tipo);

        $client->request('PUT', '/api/users/'.$user->getId(), [
            'json' => [
                'username' => 'newusername',
                'roles' => ['ROLE_ADMIN'] // will be ignored
            ]
        ]);
        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            'username' => 'newusername'
        ]);

        $em = $this->getEntityManager();
        /** @var User $user */
        $user = $em->getRepository(User::class)->find($user->getId());
        $this->assertEquals(['ROLE_USER'], $user->getRoles());
    }
}

