<?php

namespace App\Tests\Functional;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Turno;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use App\Entity\User;
use Faker\Factory;

class TurnoResourceTest extends CustomApiTestCase{
    use ReloadDatabaseTrait;
    public function testCreateTurno(){
        $faker = Factory::create();

        $client = self::createClient();
        $user = $this->createUser(
            'testUser',
            'foo',
            'CASA',
            '+5354178553');

        //Testeando que no se pueda crear Turnos sin estar logueado
        $client->request('POST', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>$faker->paragraph(5, true),
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);
        
        //Testeando que se cree un turno normalmente estando ya registrado
        $token = $this->logIn($client, 'testUser', 'foo');
        $client->request('POST', '/api/turnos',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>'foo',
                'user'=>'/api/users/'.$user->getId(),
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);

        //Comprobando que NO se pueda crear un turno y registrar al usuario en cascada
        $client->request('POST', '/api/turnos',[
            'headers'=> [
                'ContentType'=>'application/json+ld'
            ],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>'foo',
                'user'=>[
                    'username' => 'testUser2',
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
                    'nationality' => 'Cubana'
                ],
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);
    }

    public function testUpdateTurno()
    {
        $client = self::createClient();
        $user1 = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553');
        $user2 = $this->createUser(
            'testUser2',
            'foo',
            'TRABAJO',
            '+52196875');

        //creando turno de usuario 1
        $token = $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/turnos',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>'foo',
                'user'=>'/api/users/'.$user1->getId(),
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
        
        //Comprobando que se pueda modificar el turno creado por el mismo usuario
        $token = $this->logIn($client, 'testUser1', 'foo');
        $client->request('PUT', '/api/turnos/1', [
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json' => [
                'defecto'=>'foo',
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

        //logueando al usuario 2 e intentando modificar el turno creado por el usuario 1
        $tokenUser = $this->logIn($client, 'testUser2', 'foo');
        $client->request('PUT', '/api/turnos/1', [
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$tokenUser
            ],
            'json' => [
                'defecto'=>'foo',
            ],
        ]);
        $this->assertResponseStatusCodeSame(403);

        //modificando el turno del usuario 1 por un usuario administrador
        $em = $this->getEntityManager();
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();
        
        $tokenAdmin = $this->logIn($client, 'testUser2', 'foo');
        $client->request('PUT', '/api/turnos/1', [
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$tokenAdmin
            ],
            'json' => [
                'defecto'=>'foo',
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);
    }

    public function testDeleteTurno()
    {
        $client = self::createClient();
        $user1 = $this->createUser(
            'testUser1',
            'foo',
            '123456789',
            '+5354178553');
        $user2 = $this->createUser(
            'testUser2',
            'foo',
            '123456789',
            '+54178553');

        $this->createAvailableDateAsAdmin($client, "2020-08-20T20:11:28.000Z");
        //creando turno de usuario 1
        $token = $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/turnos',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>'foo',
                'user'=>'/api/users/'.$user1->getId(),
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
        
        //Intentando eliminar el turno de otro usuario: La respuesta sera 404 porque
        //el u
        $tokenUser = $this->logIn($client, 'testUser2', 'foo');
        $client->request('DELETE', '/api/turnos/1',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$tokenUser
            ],
        ]);
        $this->assertResponseStatusCodeSame(403);
        
        //Eliminando el turno de un usuario como administrador
        $em = $this->getEntityManager();
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $tokenAdmin = $this->logIn($client, 'testUser2', 'foo');
        $client->request('DELETE', '/api/turnos/1',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$tokenAdmin
                ],
        ]);
        $this->assertResponseStatusCodeSame(204);
    }

    public function testGetTurnos()
    {
        $client = self::createClient();
        $user = $this->createUser(
            'testUser1',
            'foo',
            '123456789',
            '+5354178553');

        //Testeando que haya que loguearse para acceder
        $client->request('GET', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Comprobando que un usuario normal no pueda acceder a todos los turnos
        $token = $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/turnos',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

        //Comprobando que un usuario Administrador si tenga acceso al recurso
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $token = $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/turnos',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);
    }
}