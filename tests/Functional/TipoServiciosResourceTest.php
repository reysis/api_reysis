<?php


namespace App\Tests\Functional;


use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class TipoServiciosResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateTipoServicio(){
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo','123456789', $tipo1);

        $client->request('POST', '/api/tipos_servicios',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'nombre' => 'OrdenServicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando el Tipo de OrdenServicio como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/tipos_servicios',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'nombre' => 'OrdenServicio 1',
                'descripcion' => 'Esto es una pequena descripcion',
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testGetTipoServicios(){
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo','123456789', $tipo1);

        $client->request('GET', '/api/tipos_servicios',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(200);

    }

}
