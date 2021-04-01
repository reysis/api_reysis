<?php

namespace App\Repository;

use App\Entity\TallerBrindaServicio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TallerBrindaServicio|null find($id, $lockMode = null, $lockVersion = null)
 * @method TallerBrindaServicio|null findOneBy(array $criteria, array $orderBy = null)
 * @method TallerBrindaServicio[]    findAll()
 * @method TallerBrindaServicio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TallerBrindaServicioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TallerBrindaServicio::class);
    }

    // /**
    //  * @return TallerBrindaServicio[] Returns an array of TallerBrindaServicio objects
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
    public function findOneBySomeField($value): ?TallerBrindaServicio
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
