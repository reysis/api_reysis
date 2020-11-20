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
        $client->request('POST', '/api/users', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username' => 'testUser',
                'password' => 'foo',
                'phoneNumbers' => [
                    ['phoneType' => 'CASA','number'=> '+54178553'],
                    ['phoneType' => 'TRABAJO','number'=> '+55178596']
                ],
                'address' => [
                    'city' => 'Las Tunas',
                    'street' => 'General Moncada',
                    'number' => '46',
                    'streetE1' => 'Policlinico Aquiles Espinosa',
                    'streetE2' => 'Joaquin Espinosa',
                    'rpto' => 'Aguilera',
                    'country' => 'Cuba'
                ],
                'nationality' => 'Cuban'
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testPhoneNumbersField(){
        $client = self::createClient();

        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553'
        );

        //Comprobando que un usuario anonimo no puedo leer el campo PhoneNumber
        $em = $this->getEntityManager();
        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertResponseStatusCodeSame(401);

        //Comprobando que otro usuario no pueda ver el campo PhoneNumber de otro usuario
        $user2 = $this->createUserAndLogin(
            $client,
            'testUser2',
            'foo',
            'CASA',
            '+5354178553'
        );
        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertResponseStatusCodeSame(403);

        //Comprobando que pueda ver mis propios Números de Telefonos
        $client->request('GET', '/api/users/'.$user2->getId());
        $data = $client->getResponse()->toArray();
        $this->assertArrayHasKey('phoneNumbers',$data);

        //Comprobando que un admin pueda leer los numeros de telefonos
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser2', 'foo');
        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertArrayHasKey('phoneNumbers',$data);
    }

    public function testGetSingleUser(){
        $client = self::createClient();
        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553'
        );
        $user2 = $this->createUser(
            'testUser2',
            'foo',
            'CASA',
            '+5354178553'
        );

        $em = $this->getEntityManager();
        //Comprobando que anonimamente no se pueda acceder al recurso
        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertResponseStatusCodeSame(401);

        //Logueando al usuario 1 y comprobando que puede acceder al recurso
        $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertResponseStatusCodeSame(200);

        //Dandole Permisos de administrador al Usuario 2
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //Logueando al Usuario 2 y comprobando que puede acceder a los datos de Usuario 1
        $this->logIn($client, 'testUser2', 'foo');
        $client->request('GET', '/api/users/'.$user2->getId());
        $this->assertResponseIsSuccessful();
    }

    public function testUpdateUser()
    {
        $client = self::createClient();
        $user = $this->createUserAndLogin(
            $client,
            'testUser1',
            'foo',
            'CASA',
            '+5354178553');

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
    public function testDeleteUser(){
        $client = self::createClient();
        $user = $this->createUserAndLogin(
            $client,
            'testUser1',
            'foo',
            'CASA',
            '+5354178553');
        $user2 = $this->createUser(
            'testUser2',
            'foo',
            'CASA',
            '+5354178553');

        $client->request('DELETE', '/api/users/'.$user2->getId());
        $this->assertResponseStatusCodeSame(403);

        //Dandole Permisos de administrador al Usuario 2
        $em = $this->getEntityManager();
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        //dump($user2);
        $em->flush();

        $this->logIn($client, 'testUser2', 'foo');
        $client->request('DELETE', '/api/users/'.$user->getId());
        $this->assertResponseIsSuccessful();

        //Comprobando que no existe el usuario en la BD y comprobando 404 not found error response
        $client->request('DELETE', '/api/users/'.$user->getId());
        $this->assertResponseStatusCodeSame(404);
    }
}

