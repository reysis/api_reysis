<?php

namespace App\Repository;

use App\Entity\CuentaBanco;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CuentaBanco|null find($id, $lockMode = null, $lockVersion = null)
 * @method CuentaBanco|null findOneBy(array $criteria, array $orderBy = null)
 * @method CuentaBanco[]    findAll()
 * @method CuentaBanco[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CuentaBancoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CuentaBanco::class);
    }

    // /**
    //  * @return CuentaBanco[] Returns an array of CuentaBanco objects
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
    public function findOneBySomeField($value): ?CuentaBanco
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
