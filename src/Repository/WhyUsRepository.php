<?php

namespace App\Repository;

use App\Entity\WhyUs;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WhyUs|null find($id, $lockMode = null, $lockVersion = null)
 * @method WhyUs|null findOneBy(array $criteria, array $orderBy = null)
 * @method WhyUs[]    findAll()
 * @method WhyUs[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WhyUsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WhyUs::class);
    }

    // /**
    //  * @return WhyUs[] Returns an array of WhyUs objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WhyUs
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
