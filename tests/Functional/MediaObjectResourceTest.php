<?php


namespace App\Tests\Functional;


use App\Test\CustomApiTestCase;
use Faker\Factory;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class MediaObjectResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testPostMediaObject()
    {
        $client = self::createClient();
        $faker = Factory::create();

        $client->request("POST", "/api/media-objects",[
            'headers'=> ['Content-Type' => 'application/json']
        ]);
    }
}