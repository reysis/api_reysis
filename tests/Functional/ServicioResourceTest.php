<?php


namespace App\Tests\Functional;


use App\Entity\MediaObject;
use App\Entity\User;
use App\Services\CustomUploaderHelper;
use App\Test\CustomApiTestCase;
use App\utils\MediaObjectFile;
use Faker\Factory;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use function MongoDB\BSON\toJSON;

class ServicioResourceTest extends CustomApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateService()
    {
        $client = self::createClient();
        $faker = Factory::create();

        //Testeando peticion incorrecta
        $client->request('POST', '/api/servicios', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [],
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Creando un usuario para authenticarlo
        $user = $this->createUser(
            'testUser1',
            'foo',
            'CASA',
            '+5354178553');
        $user2 = $this->createUser(
            'testUser2',
            'foo',
            'CASA',
            '+5354178553');

        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find(1);
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $token = $this->logIn($client, 'testUser1', 'foo');
        $arrayOfImages = [];

        $amountOfImages = $faker->numberBetween(1, 3);

        for($i = 0; $i < $amountOfImages; $i++){
            $file = new MediaObjectFile();
            $file->filename = $faker->name.".jpg";
            $file->data = base64_encode($faker->sentence);
            $arrayOfImages[] = $file;
        }
        $serviceName = $faker->name;
        //Comprobando que un admin pueda crear un servicio normalmente
        $client->request('POST', '/api/servicios',[
            'headers'=> [
                'Content-Type' => 'application/ld+json',
                'Authorization' => 'Bearer '.$token
            ],
            'json' => [
                'nombre' => $serviceName,
                'descripcion'=> $faker->sentence,
                'updatedAt'=> new \DateTime(),
                'serviceImages' => $arrayOfImages
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['nombre'=>$serviceName]);

        //Comprobando que anonimamente no se pueda crear un servicio
        $client->request('POST', '/api/servicios',[
            'headers'=> [
                'Content-Type' => 'application/ld+json',
            ],
            'json' => [
                'nombre' => $faker->name,
                'descripcion'=> $faker->sentence,
                'updatedAt'=> new \DateTime(),
                'serviceImages' => $arrayOfImages
            ],
        ]);
        $this->assertResponseStatusCodeSame(401);

        //Comprobando que un usuario normal no pueda crear un servicio
        $token = $this->logIn($client, 'testUser2', 'foo');
        $client->request('POST', '/api/servicios',[
            'headers'=> [
                'Content-Type' => 'application/ld+json',
                'Authorization' => 'Bearer '.$token
            ],
            'json' => [
                'nombre' => $faker->name,
                'descripcion'=> $faker->sentence,
                'updatedAt'=> new \DateTime(),
                'serviceImages' => $arrayOfImages
            ],
        ]);
        $this->assertResponseStatusCodeSame(403);
    }

    public function testGetAllServices()
    {
        $client = self::createClient();
        //Comprobando que se pueda acceder a los servicios anonimamente
        $client->request('GET', '/api/servicios',[
            'headers'=> [
                'Content-Type' => 'application/ld+json'
            ]
        ]);
        $this->assertResponseIsSuccessful();
    }
}