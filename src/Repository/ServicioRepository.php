<?php

namespace App\Repository;

use App\Entity\OrdenServicio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method OrdenServicio|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrdenServicio|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrdenServicio[]    findAll()
 * @method OrdenServicio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServicioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrdenServicio::class);
    }

    // /**
    //  * @return OrdenServicio[] Returns an array of OrdenServicio objects
    //  */
    /*
    public_html function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public_html function findOneBySomeField($value): ?OrdenServicio
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
