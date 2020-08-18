<?php

namespace App\Test\Functional;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class TurnoResourceTest extends ApiTestCase{
    public function testCreateTurno(){
        $client = self::createClient();

        $client->request('POST', '/api/turnos',[
            'headers'=> ['ContentType'=>'application/json+ld']
        ]);
        $this->assertResponseStatusCodeSame(401);
    }
}