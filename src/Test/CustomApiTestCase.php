<?php

namespace App\Test;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;
use App\Entity\Address;
use App\Entity\MediaObject;
use App\Entity\Notification;
use App\Entity\Persona;
use App\Entity\PhoneNumber;
use App\Entity\Servicio;
use App\Repository\UserRepository;
use App\Services\CustomUploaderHelper;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Faker\Factory;
use Symfony\Component\HttpFoundation\File\File;

class CustomApiTestCase extends ApiTestCase
{
    protected function login(Client $client,string $username = 'user', string $password): ?string
    {
        $response = $client->request('POST','/api/authentication', [
            'headers' => ['ContentType'=>'application/json+ld'],
            'json'=> [
                'username' => $username,
                'password' => $password
            ]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);

        return $data['token'];
    }
    /**
     * Función para crear una dirección

     * @return Address
     */
    protected function createAddress(string $postAddress, string $indications){
        $address = new Address();
        $address->setPostAddress($postAddress);
        $address->setIndications($indications);

        return $address;
    }

    /**
     * Función para crear un Número de Telefono

     * @return PhoneNumber
     */
    protected function createPhoneNumber(string $type, string $number){
        $phoneNumber = new PhoneNumber();
        $phoneNumber->setPhoneType($type);
        $phoneNumber->setNumber($number);

        return $phoneNumber;
    }
    /**
     * Función para crear una Persona

     * @return Persona
     */
    protected function createPersona(string $name, string $ci){
        $person = new Persona();
        $person->setNombre($name);
        $person->setCi($ci);

        return $person;
    }

    protected function createNotification(User $user){
        $faker = Factory::create();
        $notification = new Notification();
        $notification->setDate($faker->dateTime);
        $notification->setDescription($faker->sentence);
        $notification->setUser($user);

        $em = $this->getEntityManager();
        $em->persist($notification);
        $user->addNotification($notification);
        $em->flush();
    }

    /**
     * Función para crear un usuario normal
     *
     * @return User
     */
    protected function createUser(
        string $username,
        string $password,
        string $phoneType,
        string $telephone):User
    {
        $faker = Factory::create();
        $user = new User();
        $user->setUsername($username);

        $user->setProfilePicture($this->createProfilePicture());
        $encoded = self::$container->get('security.password_encoder')
            ->encodePassword($user, $password);
        $user->setPassword($encoded);
        $user->setNationality("Cuban");
        $user->setEmail($faker->email);
        $user->addPhoneNumber(
            $this->createPhoneNumber($phoneType, $telephone)
        );

        $user->setAddress(
            $this->createAddress(
                $faker->sentence(9, true),
                $faker->paragraph(4, true))
        );
        $person = $this->createPersona($faker->name, $faker->numberBetween(100000000000,99999999999));
        $user->setPersona($person);

        $em = $this->getEntityManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }


    protected function createUserAndLogin(Client $client,string $username, string $password, string $phoneType, string $telephone) :?string
    {
        $this->createUser($username, $password, $phoneType,$telephone);

        return $this->login($client, $username, $password);
    }

    protected function getEntityManager():EntityManagerInterface
    {
        return self::$container->get('doctrine')->getManager();
    }

    protected function createAvailableDateAsAdmin($client, $date)
    {
        $user = $this->createUser(
            "adminAD",
            'foo',
            "CASA",
            "+5354178553"
        );

        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($user->getId());
        $user->setRoles(['ROLE_ADMIN']);
        $em->flush();

        $token = $this->login($client,'adminAD', 'foo');
        /**
         * @var Client $client
         */
        $client->request("POST", "/api/available-dates",[
            'headers'=> [
                'ContentType'=>'application/json+ld',
                'Php-Auth-Digest' => 'Bearer '.$token
            ],
            'json' => [
                'date' => $date,
                'amountAvailable' => 5,
                'originalAmount' => 5
            ]
        ]);
        $this->assertResponseIsSuccessful();
    }

    public function createOneService()
    {
        $servicio = new Servicio();
        $servicio->setNombre('testServicio');
        $servicio->setDescripcion('some description');
        $servicio->setUpdatedAt(new \DateTime());

        $em = $this->getEntityManager();
        $em->persist($servicio);
        $em->flush();

        return $servicio;
    }

    public function createServiceImage(): MediaObject
    {
        $serviceImage = new MediaObject();
        $serviceImage->setServicio($this->createOneService());
        $uploadedImage = new File(__DIR__ . "/images/default-user.png");
        $serviceImage->setFile(
            $uploadedImage
        );
        $serviceImage->setFilePath(
            "service_image/default-user.png"
        );
        $em = self::$container->get('doctrine')->getManager();
        $em->persist($serviceImage);
        $em->flush();

        return $serviceImage;
    }

    /**
     * @return MediaObject
     */
    protected function createProfilePicture($user = null): MediaObject
    {
        $profilePicture = new MediaObject();
        $uploadedImage = new File(__DIR__ . "/images/default-user.png");
        $profilePicture->setFile(
            $uploadedImage
        );
        if($user ?? null){
            $profilePicture->setUser($user);
        }
        $profilePicture->setFilePath(
            "user_images/default-user.png"
        );
        $em = self::$container->get('doctrine')->getManager();
        $em->persist($profilePicture);
        $em->flush();

        return $profilePicture;
    }
}