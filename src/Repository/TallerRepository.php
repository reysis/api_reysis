<?php

namespace App\Repository;

use App\Entity\Taller;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Taller|null find($id, $lockMode = null, $lockVersion = null)
 * @method Taller|null findOneBy(array $criteria, array $orderBy = null)
 * @method Taller[]    findAll()
 * @method Taller[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TallerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Taller::class);
    }

    // /**
    //  * @return Taller[] Returns an array of Taller objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Taller
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
