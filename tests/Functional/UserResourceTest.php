<?php

namespace App\Test\Functional;

use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use Faker\Factory;

class UserResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;
    public function testCreateUser(){

        $faker = Factory::create();

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
                    ['phoneType' => $faker->word,'number'=> $faker->phoneNumber],
                    ['phoneType' => $faker->word,'number'=> $faker->phoneNumber]
                ],
                'address' => [
                    'postAddress' => $faker->sentence(9, true),
                    'indications' => $faker->paragraph(5, true)
                ],
                'persona' => [
                    'nombre' => $faker->name,
                    'ci' => $faker->numberBetween(100000000000,99999999999).$this->toString()
                ],
                'nationality' => $faker->country
            ]
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
        $client->request('GET', '/api/users/'.$user->getId(), [
            'headers'=> ['ContentType'=>'application/json+ld']
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Comprobando que otro usuario no pueda ver el campo PhoneNumber de otro usuario
        $token = $this->createUserAndLogin(
            $client,
            'testUser2',
            'foo',
            'CASA',
            '+5354178553'
        );
        $this->assertJsonContains(['location'=>'/api/users/2']);

        //Se obtiene 404 porque el filtro que se aplica a la entidad Usuario automaticamente quita los datos del usuario si no son los suyos propios
        $client->request('GET', '/api/users/'.$user->getId(),[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseStatusCodeSame(404);

        //Comprobando que pueda ver mis propios Números de Telefonos
        $client->request('GET', '/api/users/2',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token
            ],
        ]);
        $data = $client->getResponse()->toArray();
        $this->assertArrayHasKey('phoneNumbers',$data);

        //Comprobando que un admin pueda leer los numeros de telefonos
        $user2 = $em->getRepository(User::class)->find(2);
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $token2 = $this->login($client,'testUser2', 'foo');
        $client->request('GET', '/api/users/'.$user->getId(),[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token2
            ],
        ]);
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
        $client->request('GET', '/api/users/'.$user->getId(),[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Logueando al usuario 1 y comprobando que puede acceder al recurso
        $token = $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/users/'.$user->getId(),[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

        //Dandole Permisos de administrador al Usuario 2
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //Logueando al Usuario 2 y comprobando que puede acceder a los datos de Usuario 1
        $token2 = $this->logIn($client, 'testUser2', 'foo');
        $client->request('GET', '/api/users/'.$user2->getId(),[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token2
            ],
        ]);
        $this->assertResponseIsSuccessful();
    }

    public function testUpdateUser()
    {
        $client = self::createClient();
        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553');

        $token = $this->login($client, 'testUser1', 'foo');
        $client->request('PUT', '/api/users/'.$user->getId(), [
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token
            ],
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
        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553');
        $token = $this->login($client, 'testUser1', 'foo');

        $user2 = $this->createUser(
            'testUser2',
            'foo',
            'CASA',
            '+5354178553');

        //Comprobando que anonimamente no se pueda eliminar
        $client->request('DELETE', '/api/users/'.$user2->getId(),[
            'headers'=> [
                'ContentType'=>'application/json+ld',
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Dandole Permisos de administrador al Usuario 2
        $em = $this->getEntityManager();
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        //dump($user2);
        $em->flush();

        $token2 = $this->logIn($client, 'testUser2', 'foo');
        $client->request('DELETE', '/api/users/'.$user->getId(),[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token2
            ],
        ]);
        $this->assertResponseIsSuccessful();

        //Comprobando que no existe el usuario en la BD y comprobando 404 not found error response
        $client->request('DELETE', '/api/users/'.$user->getId(),[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token2
            ],
        ]);
        $this->assertResponseStatusCodeSame(404);
    }
    public function testGetAll(){
        $client = self::createClient();
        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553'
        );
        $em = $this->getEntityManager();
        //Comprobando que anonimamente se acceda al recurso
        $client->request('GET', '/api/users',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains(['hydra:totalItems' => 0]);

        //Comprobando que se pueda acceder como un usuario normal
        $token = $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/users',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains(['hydra:totalItems' => 0]);

        $user2 = $this->createUser(
            'testUser2',
            'foo',
            'CASA',
            '+5354178553'
        );
        //Dandole Permisos de administrador al Usuario 2
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $token2 = $this->logIn($client, 'testUser2', 'foo');
        $client->request('GET', '/api/users',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token2
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['hydra:totalItems' => 2]);
    }
}

