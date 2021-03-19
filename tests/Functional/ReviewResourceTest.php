<?php


namespace App\Tests\Functional;


use App\Test\CustomApiTestCase;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class ReviewResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testGetReviews()
    {
        $client = self::createClient();
        $this->checkAnonimousAccessGranted($client,'/api/reviews');

        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553'
        );

        //comprobando que tenga acceso como usuario registrado normal
        $token = $this->login($client, 'testUser1', 'foo');
        $client->request('GET', '/api/reviews',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['hydra:totalItems' => 0]);

        //comprobando que tenga acceso como administrador
        $user = $this->grantAdminAccess($user);
        $token = $this->login($client, 'testUser1', 'foo');
        $client->request('GET', '/api/reviews',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['hydra:totalItems' => 0]);
    }

    public function testPostReviews()
    {
        $client = self::createClient();

        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553'
        );

        //Comprobando que no se pueda crear anonimamente la review
        $client->request('POST', '/api/reviews',[
            'headers'=> [
                'ContentType'=>'application/json+ld'
            ],
            'json' => [
                'reviewText' => 'Something',
                "user"=> "/api/users/1",
                "likes"=> 0,
                "stars"=> 1
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        $user2 = $this->createUser(
            'testUser2',
            'foo',
            'CASA',
            '+5354178553'
        );

        //comprobando que tenga acceso como usuario registrado normal a crear una review
        $token = $this->login($client, 'testUser1', 'foo');
        $client->request('POST', '/api/reviews',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json' => [
                'reviewText' => 'Something',
                "user"=> "/api/users/1",
                "likes"=> 0,
                "stars"=> 1
            ]
        ]);
        $this->assertResponseIsSuccessful();

        $token = $this->login($client, 'testUser1', 'foo');
        $client->request('POST', '/api/reviews',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json' => [
                'reviewText' => 'Something',
                "user"=> "/api/users/2",
                "likes"=> 0,
                "stars"=> 1
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);
    }
}