<?php


namespace App\Tests\Functional;


use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use App\Entity\User;

class TipoServiciosResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateTipoServicio(){
        $client = self::createClient();

        $client->request('POST', '/api/tipos_servicios',[
            'headers'=> ['ContentType'=>'application/json'],
            'json' => [
                'nombre' => 'Servicio1',
                'descripcion' => 'algo',
                'image' => 'algo'
            ],
        ]);

        $this->assertResponseStatusCodeSame(401);
    }

    public function testGetTipoServicios(){
        $client = self::createClient();

        $client->request('GET', '/api/tipos_servicios',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo','123456789', $tipo1);

        //Refrescando el usuario y dandole permisos de administración
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //Reloguenado para que Symfony note los permisos de administración
        $this->logIn($client, 'testUser1', 'foo');

        $client->request('GET', '/api/tipos_servicios',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

    }

}
