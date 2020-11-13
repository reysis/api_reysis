<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Turno;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class TurnoDataPersister implements ContextAwareDataPersisterInterface
{
    private $decoratedDataPersister;
    private $userPasswordEncoder;
    private $logger;

    public function __construct(DataPersisterInterface $decoratedDataPersister, UserPasswordEncoderInterface $userPasswordEncoder, LoggerInterface $logger)
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->logger = $logger;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Turno;
    }
    /**
     * Persister
     *
     * @param Turno $data
     */
    public function persist($data, array $context = [])
    {
        if($data->getUser()->getPlainPassword()){
            $data->getUser()->setPassword(
                $this->userPasswordEncoder->encodePassword($data->getUser(), $data->getUser()->getPlainPassword())
            );
            $data->getUser()->eraseCredentials();
        }
        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }
}