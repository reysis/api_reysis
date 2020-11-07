<?php

namespace App\Repository;

use App\Entity\TipoCuenta;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TipoCuenta|null find($id, $lockMode = null, $lockVersion = null)
 * @method TipoCuenta|null findOneBy(array $criteria, array $orderBy = null)
 * @method TipoCuenta[]    findAll()
 * @method TipoCuenta[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TipoCuentaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TipoCuenta::class);
    }

    // /**
    //  * @return TipoCuenta[] Returns an array of TipoCuenta objects
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
    public function findOneBySomeField($value): ?TipoCuenta
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
