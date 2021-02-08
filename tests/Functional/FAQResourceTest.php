<?php


namespace App\Tests\Functional;


use App\Entity\User;
use App\Test\CustomApiTestCase;
use Faker\Factory;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class FAQResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testGetFaqs()
    {
        $client = self::createClient();

        //Comprobando que se pueda acceder a las FAQS anonimamente
        $client->request('GET','/api/f-a-qs',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseIsSuccessful();
    }

    public function testPostFaqs()
    {
        $faker = Factory::create();
        $client = self::createClient();

        //Comprobando que no se pueda crear FAQS anonimamente
        $client->request('POST','/api/f-a-qs',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json'=>[
                'question' => $faker->sentence(6,true),
                'answer' => $faker->paragraph(9,true),
                'category' => $faker->word
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        $user = $this->createUser(
            'testUser',
            'foo',
            'CASA',
            '+5354178553');

        $token = $this->login($client, 'testUser', 'foo');
        //Comprobando que un usuario normla no pueda crear FAQS
        $client->request('POST','/api/f-a-qs',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json'=>[
                'question' => $faker->sentence(6,true),
                'answer' => $faker->paragraph(9,true),
                'category' => $faker->word
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);

        //modificando el turno del usuario 1 por un usuario administrador
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //Relogueando para refrescar permisos de administrador
        $token = $this->login($client, 'testUser', 'foo');

        //Comprobando que un admin pueda crear FAQS
        $client->request('POST','/api/f-a-qs',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json'=>[
                'question' => $faker->sentence(6,true),
                'answer' => $faker->paragraph(9,true),
                'category' => $faker->word
            ]
        ]);
        $this->assertResponseIsSuccessful();
    }
    public function testGetSingleFAQ()
    {
        $faker = Factory::create();
        $client = self::createClient();

        $user = $this->createUser(
            'testUser',
            'foo',
            'CASA',
            '+5354178553');

        //modificando el turno del usuario 1 por un usuario administrador
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //Logueando para refrescar permisos de administrador
        $token = $this->login($client, 'testUser', 'foo');

        $client->request('POST','/api/f-a-qs',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json'=>[
                'question' => $faker->sentence(6,true),
                'answer' => $faker->paragraph(9,true),
                'category' => $faker->word
            ]
        ]);
        $this->assertResponseIsSuccessful();

        //Comprobando que un admin pueda acceder al recurso
        $client->request('GET','/api/f-a-qs/1',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseIsSuccessful();

        //Comprobando que no se pueda acceder a una FAQ particular anonimamente
        $client->request('GET','/api/f-a-qs/1',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(401);

        $user = $this->createUser(
            'testUser2',
            'foo',
            'CASA',
            '+5354178553');

        //Logueando al segundo usuario que no tiene permisos de administrador
        $token = $this->login($client, 'testUser2', 'foo');

        //Comprobando que un usuario no pueda acceder al recurso
        $client->request('GET','/api/f-a-qs/1',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseStatusCodeSame(403);

    }
}