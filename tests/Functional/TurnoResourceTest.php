<?php

namespace App\Test\Functional;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Turno;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use App\Entity\User;
class TurnoResourceTest extends CustomApiTestCase{
    use ReloadDatabaseTrait;
    public function testCreateTurno(){
        $client = self::createClient();
        $tipo = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser', 'foo', '123456789',$tipo);

        //Testeando que no se pueda crear Turnos a no ser que este logueado
        $client->request('POST', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [],
        ]);
        $this->assertResponseStatusCodeSame(401);
        
        //Testeando que se cree un turno normalmente
        $this->logIn($client, 'testUser', 'foo');
        $client->request('POST', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>'foo',
                'personaCitada'=>'/api/users/'.$user->getId(),
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testUpdateTurno()
    {
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $tipo2 = $this->createTipoUsuario('Empresa');
        $user1 = $this->createUser('testUser1', 'foo', '123456789',$tipo1);
        $user2 = $this->createUser('testUser2', 'foo', '123456789',$tipo2);

        //creando turno de usuario 1
        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>'foo',
                'personaCitada'=>'/api/users/'.$user1->getId(),
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
        
        //Comprobando que se pueda modificar el turno creado por el mismo usuario
        $this->logIn($client, 'testUser1', 'foo');
        $client->request('PUT', '/api/turnos/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'defecto'=>'foo',
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

        //logueando al usuario 2 e intentando modificar el turno creado por el usuario 1
        $this->logIn($client, 'testUser2', 'foo');
        $client->request('PUT', '/api/turnos/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
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
        
        $this->logIn($client, 'testUser2', 'foo');
        $client->request('PUT', '/api/turnos/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'defecto'=>'foo',
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);
    }

    public function testDeleteTurno()
    {
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user1 = $this->createUser('testUser1', 'foo','123456789' ,$tipo1);
        $user2 = $this->createUser('testUser2', 'foo', '123456789',$tipo1);

        //creando turno de usuario 1
        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'fecha' => '2020-08-20T20:11:28.498Z',
                'defecto'=>'foo',
                'personaCitada'=>'/api/users/'.$user1->getId(),
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
        
        //Intentando eliminar el turno de otro usuario
        $this->logIn($client, 'testUser2', 'foo');
        $client->request('DELETE', '/api/turnos/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(403);
        
        //Eliminando el turno de un usuario como administrador
        $em = $this->getEntityManager();
        $user2 = $em->getRepository(User::class)->find($user2->getId());
        $user2->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser2', 'foo');
        $client->request('DELETE', '/api/turnos/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(204);
    }

    public function testGetTurnos()
    {
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo','123456789', $tipo1);

        //Testeando que haya que loguearse para acceder
        $client->request('GET', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Comprobando que un usuario normal no pueda acceder a todos los turnos
        $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(403);

        //Comprobando que un usuario Administrador si tenga acceso al recurso
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');
        $client->request('GET', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(200);
    }
}