<?php

namespace App\Repository;

use App\Entity\CuentaMN;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CuentaMN|null find($id, $lockMode = null, $lockVersion = null)
 * @method CuentaMN|null findOneBy(array $criteria, array $orderBy = null)
 * @method CuentaMN[]    findAll()
 * @method CuentaMN[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CuentaMNRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CuentaMN::class);
    }

    // /**
    //  * @return CuentaMN[] Returns an array of CuentaMN objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CuentaMN
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
