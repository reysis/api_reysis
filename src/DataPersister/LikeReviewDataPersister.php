<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\LikeReview;
use Doctrine\ORM\EntityManagerInterface;

class LikeReviewDataPersister implements ContextAwareDataPersisterInterface
{
    private DataPersisterInterface $decoratedDataPersister;
    private EntityManagerInterface $entityManager;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        EntityManagerInterface $entityManager
    )
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->entityManager = $entityManager;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof LikeReview;
    }

    /**
     * @param LikeReview $data
     * @param array $context
     * @return object|void
     */
    public function persist($data, array $context = [])
    {
        $data->getIdReview()->setLikes( $data->getIdReview()->getLikes() + 1 );
        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $data->getIdReview()->setLikes( $data->getIdReview()->getLikes() - 1 );
        $this->decoratedDataPersister->remove($data);
    }
}