<?php

namespace App\Repository;

use App\Entity\Accesorios;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Accesorios|null find($id, $lockMode = null, $lockVersion = null)
 * @method Accesorios|null findOneBy(array $criteria, array $orderBy = null)
 * @method Accesorios[]    findAll()
 * @method Accesorios[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccesoriosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Accesorios::class);
    }

    // /**
    //  * @return Accesorios[] Returns an array of Accesorios objects
    //  */
    /*
    public_html function findByExampleField($value)
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
    public_html function findOneBySomeField($value): ?Accesorios
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
