<?php

namespace App\Repository;

use App\Entity\LikeReview;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Query\Parameter;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LikeReview|null find($id, $lockMode = null, $lockVersion = null)
 * @method LikeReview|null findOneBy(array $criteria, array $orderBy = null)
 * @method LikeReview[]    findAll()
 * @method LikeReview[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LikeReviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LikeReview::class);
    }

    // /**
    //  * @return LikeReview[] Returns an array of LikeReview objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /**
     * @return LikeReview[] Array of LikedReviews
     */
    public function findOneLiked($idReview, $idUser)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.idReview = :idReview AND v.idUser = :idUser')
            ->setParameters(new ArrayCollection(array(
                new Parameter('idReview', $idReview),
                new Parameter('idUser', $idUser)
            )))
            ->orderBy('v.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
}
