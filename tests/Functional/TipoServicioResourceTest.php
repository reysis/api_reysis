<?php


namespace App\Tests\Functional;


use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class TipoServicioResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateTipoServicio()
    {
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testGetTipoServicios()
    {
        $client = self::createClient();

        $client->request('GET', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        //Refrescando el usuario y dandole permisos de administración
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //Reloguenado para que Symfony note los permisos de administración
        $this->logIn($client, 'testUser1', 'foo');

        $client->request('GET', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

    }

    public function testUpdateTipoServicio(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('PUT', '/api/tipos_servicios/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 2',
                'descripcion' => 'Esto es una pequena descripcion',
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

        $this->logOut($client);

        $client->request('PUT', '/api/tipos_servicios/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 3',
                'descripcion' => 'Esto es una pequena descripcion',
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);

    }

    public function testDeleteTipoServicio(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('DELETE', '/api/tipos_servicios/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(204);

        $client->request('POST', '/api/tipos_servicios', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'Servicio 2',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);

        $this->logOut($client);

        $client->request('DELETE', '/api/tipos_servicios/2',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(401);
    }

}
