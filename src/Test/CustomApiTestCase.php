<?php

namespace App\Test;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;
use App\Entity\Address;
use App\Entity\PhoneNumber;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\TipoEquipo;
use App\Entity\TipoUsuario;
use App\Entity\User;

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
    protected function createAddress(string $street, string $city, string $number, string $streetE1, string $streetE2, string $rpto, string $country){
        $address = new Address();
        $address->setStreet($street);
        $address->setCity($city);
        $address->setStreetE1($streetE1);
        $address->setStreetE2($streetE2);
        $address->setCountry($country);
        $address->setRpto($rpto);
        $address->setNumber($number);

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
     * Función para crear un usuario normal

     * @param TipoUsuario $tipoUsuario
     * @return User
     */
    protected function createUser(string $username, string $password, string $phoneType, string $telephone):User
    {
        $user = new User();
        $user->setUsername($username);

        $encoded = self::$container->get('security.password_encoder')
            ->encodePassword($user, $password);
        $user->setPassword($encoded);
        $user->setNationality("Cuban");
        $user->addPhoneNumber(
            $this->createPhoneNumber($phoneType, $telephone)
        );
        $user->setAddress(
            $this->createAddress(
                "General Moncada",
                "Las Tunas",
                "46",
                "Policlinico Aquiles Espinosa",
                "Joaquin Espinosa",
                "Aguilera",
                "Cuba")
        );
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