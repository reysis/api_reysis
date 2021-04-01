<?php

namespace App\Repository;

use App\Entity\TurnoDisponible;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TurnoDisponible|null find($id, $lockMode = null, $lockVersion = null)
 * @method TurnoDisponible|null findOneBy(array $criteria, array $orderBy = null)
 * @method TurnoDisponible[]    findAll()
 * @method TurnoDisponible[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TurnoDisponibleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TurnoDisponible::class);
    }

     /**
      * @return TurnoDisponible Returns an array of TurnoDisponible objects
      */
    public function findById($id)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }


    /*
    public function findOneBySomeField($value): ?TurnoDisponible
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
