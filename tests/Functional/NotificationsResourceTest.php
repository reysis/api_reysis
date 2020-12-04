<?php


namespace App\Tests\Functional;


use App\Entity\Notification;
use App\Test\CustomApiTestCase;
use Faker\Factory;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class NotificationsResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testGetNotifications()
    {
        $faker = Factory::create();
        $client = self::createClient();
        $user = $this->createUser(
            'testUser',
            'foo',
            'CASA',
            '+5354178553');

        $this->createNotification($user);

        $client->request('GET', '/api/notifications',[
            'headers'=> ['ContentType'=>'application/json+ld'],
        ]);
        $this->assertResponseStatusCodeSame(401);

        $token = $this->login($client,'testUser', 'foo');
        $client->request('GET', '/api/notifications',[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Authorization' => 'Bearer '.$token
            ],
        ]);
        $this->assertResponseStatusCodeSame(200);
    }
}