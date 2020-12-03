<?php

namespace App\Repository;

use App\Entity\TurnoDateAvailable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TurnoDateAvailable|null find($id, $lockMode = null, $lockVersion = null)
 * @method TurnoDateAvailable|null findOneBy(array $criteria, array $orderBy = null)
 * @method TurnoDateAvailable[]    findAll()
 * @method TurnoDateAvailable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TurnoDateAvailableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TurnoDateAvailable::class);
    }

    // /**
    //  * @return TurnoDateAvailable[] Returns an array of TurnoDateAvailable objects
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
    public function findOneBySomeField($value): ?TurnoDateAvailable
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
