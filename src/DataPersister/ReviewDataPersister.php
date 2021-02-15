<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Reviews;

class ReviewDataPersister implements ContextAwareDataPersisterInterface
{
    private DataPersisterInterface $decoratedDataPersister;

    public function __construct(DataPersisterInterface $decoratedDataPersister)
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Reviews;
    }

    /**
     * @param Reviews $data
     * @param array $context
     * @return object|void
     */
    public function persist($data, array $context = [])
    {
        $data->setDatePublished(new \DateTime());

        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }
}