<?php


namespace App\Tests\Functional;


use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class MarcaResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateMarca()
    {
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/marcas', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'marca 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando la Marca como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/marcas', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'marca 2'
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testGetMarca()
    {
        $client = self::createClient();

        $client->request('GET', '/api/marcas', [
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

        $client->request('GET', '/api/marcas', [
            'headers' => ['ContentType' => 'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

    }

    public function testUpdateMarca(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/marcas', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'marca 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando la Marca como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/marcas', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'marca 2'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('PUT', '/api/marcas/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'nombre' => 'marca 3'
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

    }

    public function testDeleteMarca(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/marcas', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'marca 1'
            ]
        ]);

        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/marcas', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'nombre' => 'marca 2'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('DELETE', '/api/marcas/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(204);
    }

}
