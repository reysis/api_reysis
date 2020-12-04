<?php

namespace App\Test;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;
use App\Entity\Address;
use App\Entity\Notification;
use App\Entity\Persona;
use App\Entity\PhoneNumber;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\TipoEquipo;
use App\Entity\User;
use Faker\Factory;

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

     * @param TipoUsuario $tipoUsuario
     * @return User
     */
    protected function createUser(string $username, string $password, string $phoneType, string $telephone):User
    {
        $faker = Factory::create();
        $user = new User();
        $user->setUsername($username);

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

        $em = self::$container->get('doctrine')->getManager();
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
}