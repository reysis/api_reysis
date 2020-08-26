<?php

namespace App\Test;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\TipoEquipo;
use App\Entity\TipoUsuario;
use App\Entity\User;

class CustomApiTestCase extends ApiTestCase
{
    /**
     * Función para crear un nuevo tipo de Usuario
     *
     * @param string $tipo
     * @return TipoUsario
     */
    protected function createTipoUsuario(string $tipo):TipoUsuario
    {
        $type = new TipoUsuario();

        $type->setTipo($tipo);
        $em = self::$container->get('doctrine')->getManager();
        $em->persist($type);
        $em->flush();

        return $type;
    }

    /**
     * Función para crear un usuario normal
     *
     * @param string $username
     * @param string $password
     * @param TipoUsuario $tipoUsuario
     * @return User
     */
    protected function createUser(string $username, string $password, string $telephone,TipoUsuario $tipoUsuario):User
    {
        $user = new User();
        $user->setUsername($username);

        $encoded = self::$container->get('security.password_encoder')
            ->encodePassword($user, $password);
        $user->setPassword($encoded);
        $user->setTipoUsuario($tipoUsuario);
        $user->setTelephone($telephone);

        $em = self::$container->get('doctrine')->getManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }

    /**
     * Función para loguearse
     *
     * @param Client $client
     * @param string $username
     * @param string $password
     * @return void
     */
    protected function logIn(Client $client, string $username, string $password)
    {
        $client->request('POST', '/login',[
            'headers'=> ['ContentType'=>'application/json+ld'],
            'json' => [
                'username' => $username,
                'password' => $password, 
            ],
        ]);
        $this->assertResponseStatusCodeSame(204);
    }

    protected function createUserAndLogin(Client $client,string $username, string $password, string $telephone,TipoUsuario $tipoUsuario)
    {
        $user = $this->createUser($username, $password, $telephone,$tipoUsuario);
        $this->logIn($client, $username, $password);

        return $user;
    }

    protected function getEntityManager():EntityManagerInterface
    {
        return self::$container->get('doctrine')->getManager();
    }
}