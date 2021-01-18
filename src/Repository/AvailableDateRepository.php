<?php

namespace App\Repository;

use App\Entity\AvailableDate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AvailableDate|null find($id, $lockMode = null, $lockVersion = null)
 * @method AvailableDate|null findOneBy(array $criteria, array $orderBy = null)
 * @method AvailableDate[]    findAll()
 * @method AvailableDate[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AvailableDateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AvailableDate::class);
    }

    // /**
    //  * @return AvailableDate[] Returns an array of AvailableDate objects
    //  */

    public function findOneById($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findOneByDate($value): ?AvailableDate
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.date = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
