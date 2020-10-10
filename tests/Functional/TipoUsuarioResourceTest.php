<?php


namespace App\Tests\Functional;


use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class TipoUsuarioResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateTipoUsuario()
    {
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                  'tipo' => 'Persona Natural 6'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

//        Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                  'tipo' => 'Persona Natural 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testGetTipoUsuario()
    {
        $client = self::createClient();

        $client->request('GET', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(401);

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        //Refrescando el usuario y dandole permisos de administración
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //Reloguenado para que Symfony note los permisos de administración
        $this->logIn($client, 'testUser1', 'foo');

        $client->request('GET', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

    }

    public function testUpdateTipoUsuario(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                  'tipo' => 'Persona Natural 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                  'tipo' => 'Persona Natural 1'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('PUT', '/api/tipo_usuarios/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'tipo' => 'Persona Natural 2'
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

        $this->logOut($client);

        $client->request('PUT', '/api/tipo_usuarios/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'tipo' => 'Persona Natural 3'
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);

    }

    public function testDeleteTipoUsuario(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                  'tipo' => 'Persona Natural 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                  'tipo' => 'Persona Natural 1'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('DELETE', '/api/tipo_usuarios/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(204);

        $client->request('POST', '/api/tipo_usuarios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'tipo' => 'Persona Natural 1'
            ]
        ]);

        $this->logOut($client);

        $client->request('DELETE', '/api/tipo_usuarios/2',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(401);
    }

}
