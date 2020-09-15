<?php


namespace App\Tests\Functional;


use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class TipoServiciosResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateTipoServicio(){

    }

    public function testGetTipoServicios(){
        $client = self::createClient();
        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo','123456789', $tipo1);

        $client->request('GET', '/api/tipos_servicios',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertJsonContains(['']);

    }

}
