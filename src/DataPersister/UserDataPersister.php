<?php

namespace App\DataPersister;

use ApiPlatform\Core\Bridge\Doctrine\Common\DataPersister;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class UserDataPersister implements ContextAwareDataPersisterInterface
{
    private $userPasswordEncoder;
    private $security;
    private $logger;
    private $decoratedDataPersister;

    public function __construct(DataPersisterInterface $decoratedDataPersister,UserPasswordEncoderInterface $userPasswordEncoder, LoggerInterface $logger,Security $security)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->security = $security;
        $this->logger = $logger;
        $this->decoratedDataPersister = $decoratedDataPersister;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * Persister
     *
     * @param User $data
     */
    public function persist($data, array $context = [])
    {
        //$this->logger->alert($data->getPlainPassword());
        if(($context['item_opeartion_name'] ?? null) === 'put'){
            $this->logger->info(sprintf('Usuario %s esta siendo actualizado', $data->getId()));
        }

        if(!$data->getId()){
            //Aqui se puede hacer cualquier cosa con el usuario
            //Como mandar un email de confirmacion o un mensaje
            //O añadirlo a cualquier sistema de pago
            $this->logger->info(sprintf('Usuario $s se acaba de registrar', $data->getId()));
        }

        if(!$data->getPersona()){
            $data->getPersona()->setUser( $data );
        }

        if($data->getPlainPassword()){
            $data->setPassword(
                $this->userPasswordEncoder->encodePassword($data,$data->getPlainPassword())
            );
            $data->eraseCredentials();
        }

        //$data->setIsMe($this->security->getUser() === $data);

        $this->decoratedDataPersister->persist($data);
    }
    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }
}