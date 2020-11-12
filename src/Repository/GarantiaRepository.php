<?php

namespace App\Repository;

use App\Entity\Garantia;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Garantia|null find($id, $lockMode = null, $lockVersion = null)
 * @method Garantia|null findOneBy(array $criteria, array $orderBy = null)
 * @method Garantia[]    findAll()
 * @method Garantia[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GarantiaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Garantia::class);
    }

    // /**
    //  * @return Garantia[] Returns an array of Garantia objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Garantia
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
