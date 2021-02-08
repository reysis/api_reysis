<?php


namespace App\Tests\Functional;


use App\Entity\User;
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

        //Testeando que no se pueda postear anonimamente
        $client->request("POST", "/api/media-objects",[
            'headers'=> ['Content-Type' => 'application/json'],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        $user = $this->createUser(
            'testUser1',
            'foo',
            'Casa',
            '+5555555555'
        );

        $token = $this->login($client, 'testUser1', 'foo');
        //creando una nueva imagen de perfil
        $client->request("POST", "/api/media-objects",[
            'headers'=> [
                'Content-Type' => 'application/json',
                'Php-Auth-Digest'=> 'Bearer ' . $token
            ],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy',
                'user'=> '/api/users/1'
            ]
        ]);
        $this->assertResponseIsSuccessful();

        $this->createOneService();

        //intentando crear una imagen para un servicio con ROLE_USER
        $client->request("POST", "/api/media-objects",[
            'headers'=> [
                'Content-Type' => 'application/json',
                'Php-Auth-Digest'=> 'Bearer ' . $token
            ],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy',
                'servicio'=> '/api/servicios/1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);

        //Dandole Permisos de administrador al Usuario
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //intentando crear una imagen para un servicio con ROLE_ADMIN
        $client->request("POST", "/api/media-objects",[
            'headers'=> [
                'Content-Type' => 'application/json',
                'Php-Auth-Digest'=> 'Bearer ' . $token
            ],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy',
                'servicio'=> '/api/servicios/1'
            ]
        ]);
        $this->assertResponseIsSuccessful();
    }

    public function testPutMediaObject()
    {
        $client = self::createClient();
        $faker = Factory::create();

        $this->createServiceImage();

        $user = $this->createUser(
            'testUser1',
            'foo',
            'Casa',
            '+5555555555'
        );
        $profilePicture = $this->createProfilePicture($user);

        //Testeando que no se pueda modificar ninguna imagen anonimamente
        $client->request("PUT", "/api/media-objects/1",[
            'headers'=> ['Content-Type' => 'application/json'],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy'
            ]
        ]);
        $this->assertResponseStatusCodeSame(401);

        $token = $this->login($client, 'testUser1', 'foo');

        //Testeando que no se pueda modificar ninguna imagen de servicio con ROLE_USER
        $client->request("PUT", "/api/media-objects/1",[
            'headers'=> [
                'Content-Type' => 'application/json',
                'Php-Auth-Digest'=> 'Bearer '.$token
            ],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy',
                'servicio'=> '/api/servicio/1'
            ]
        ]);
        $this->assertResponseStatusCodeSame(403);

        //Testeando que se pueda modificar una imagen de perfil con ROLE_USER
        $client->request("PUT", "/api/media-objects/3",[
            'headers'=> [
                'Content-Type' => 'application/json',
                'Php-Auth-Digest'=> 'Bearer '.$token
            ],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy',
                'user'=> '/api/user/1'
            ]
        ]);
        $this->assertResponseIsSuccessful();

        //Dandole Permisos de administrador al Usuario
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        //$token = $this->login($client, 'testUser1', 'foo');
        //Testeando que se pueda modificar imagen de servicio con ROLE_ADMIN
        $client->request("PUT", "/api/media-objects/1",[
            'headers'=> [
                'Content-Type' => 'application/json',
                'Php-Auth-Digest'=> 'Bearer '.$token
            ],
            'json'=>[
                'filename'=> 'file.png',
                'data'=> 'VGhlIGZpbmFsIGZyb250aWVy',
                'servicio'=> '/api/servicios/1'
            ]
        ]);
        $this->assertResponseIsSuccessful();
    }
}