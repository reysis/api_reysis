<?php

namespace App\Repository;

use App\Entity\AlmacenProducto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AlmacenProducto|null find($id, $lockMode = null, $lockVersion = null)
 * @method AlmacenProducto|null findOneBy(array $criteria, array $orderBy = null)
 * @method AlmacenProducto[]    findAll()
 * @method AlmacenProducto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlmacenProductoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AlmacenProducto::class);
    }

    // /**
    //  * @return AlmacenProducto[] Returns an array of AlmacenProducto objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AlmacenProducto
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
