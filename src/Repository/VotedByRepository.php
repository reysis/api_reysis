<?php

namespace App\Repository;

use App\Entity\VotedBy;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method VotedBy|null find($id, $lockMode = null, $lockVersion = null)
 * @method VotedBy|null findOneBy(array $criteria, array $orderBy = null)
 * @method VotedBy[]    findAll()
 * @method VotedBy[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VotedByRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VotedBy::class);
    }

    // /**
    //  * @return VotedBy[] Returns an array of VotedBy objects
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

    /*
    public function findOneBySomeField($value): ?VotedBy
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
