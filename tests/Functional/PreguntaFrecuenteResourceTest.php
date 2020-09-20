<?php


namespace App\Tests\Functional;


use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class PreguntaFrecuenteResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreatePreguntaFrecuente()
    {
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/pregunta_frecuentes', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/pregunta_frecuentes', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 2'
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testGetPreguntaFrecuente()
    {
        $client = self::createClient();

        $client->request('GET', '/api/pregunta_frecuentes', [
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

        $client->request('GET', '/api/pregunta_frecuentes', [
            'headers' => ['ContentType' => 'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

    }

    public function testUpdatePreguntaFrecuente(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/pregunta_frecuentes', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);

        $client->request('PUT', '/api/pregunta_frecuentes/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 4'
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/pregunta_frecuentes', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 2'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('PUT', '/api/pregunta_frecuentes/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 3'
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

    }

    public function testDeletePreguntaFrecuente(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/pregunta_frecuentes', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 1'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('DELETE', '/api/pregunta_frecuentes/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de Servicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/pregunta_frecuentes', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'pregunta' => 'pregunta 2'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('DELETE', '/api/pregunta_frecuentes/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(204);
    }

}
