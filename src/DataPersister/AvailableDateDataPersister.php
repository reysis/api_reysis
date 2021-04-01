<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\AvailableDate;
use Psr\Log\LoggerInterface;

class AvailableDateDataPersister implements ContextAwareDataPersisterInterface
{
    private DataPersisterInterface $decoratedDataPersister;
    private LoggerInterface $logger;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        LoggerInterface $logger
    ){
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->logger = $logger;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof AvailableDate;
    }

    /**
     * @param AvailableDate $data
     * @param array $context
     * @return object|void
     */
    public function persist($data, array $context = [])
    {
        $dateString = "";
        $dateString .= $data->getDia() . '/' . $data->getMes() . '/' . $data->getYear() . ' ' . $data->getHora().':' .$data->getMinutos().':00';
        dump($dateString);
        $datetime = new \DateTime($dateString);
        $data->setDate($datetime);

        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        // TODO: Implement remove() method.
    }
}