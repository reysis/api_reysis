<?php


namespace App\Tests\Functional;


use App\Entity\User;
use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class FAQResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateFAQ()
    {
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/f_a_qs', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'question' => 'question 1',
                'answer' => 'answer 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando la question Frecuente como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');
        $client->request('POST', '/api/f_a_qs', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'question' => 'question 2',
                'answer' => 'answer 2'
            ]
        ]);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testGetFAQ()
    {
        $client = self::createClient();

        $client->request('GET', '/api/f_a_qs', [
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

        $client->request('GET', '/api/f_a_qs', [
            'headers' => ['ContentType' => 'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(200);

    }

    public function testUpdateFAQ(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/f_a_qs', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'question' => 'question 1',
                'answer' => 'answer 1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando la question Frecuente como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/f_a_qs', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'question' => 'question 2',
                'answer' => 'answer 2'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('PUT', '/api/f_a_qs/1', [
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'question' => 'question 3',
                'answer' => 'answer 3'
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);

    }

    public function testDeleteFAQ(){
        $client = self::createClient();

        $tipo1 = $this->createTipoUsuario('Persona Natural');
        $user = $this->createUser('testUser1', 'foo', '123456789', $tipo1);

        $client->request('POST', '/api/f_a_qs', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'question' => 'question 1',
                'answer' => 'answer 1'
            ]
        ]);

        $this->assertResponseStatusCodeSame(401);

        //Creando la question Frecuente como Admin
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $this->logIn($client, 'testUser1', 'foo');

        $client->request('POST', '/api/f_a_qs', [
            'headers' => ['ContentType' => 'application/json+ld'],
            'json' => [
                'question' => 'question 2',
                'answer' => 'answer 2'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);

        $client->request('DELETE', '/api/f_a_qs/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);

        $this->assertResponseStatusCodeSame(204);
    }

}
