<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\ContactMessage;
use Psr\Log\LoggerInterface;

class ContactMessageDataPersister implements ContextAwareDataPersisterInterface
{
    private DataPersisterInterface $decoratedDataPersister;
    private LoggerInterface $logger;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        LoggerInterface $logger
    )
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->logger = $logger;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof ContactMessage;
    }

    /**
     * @param ContactMessage $data
     */
    public function persist($data, array $context = [])
    {
        $this->logger->info(sprintf('Se esta Persistiendo el usuario'));

        // TODO Sent an email
        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }
}