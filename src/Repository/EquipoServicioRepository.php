<?php

namespace App\Repository;

use App\Entity\EquipoServicio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method EquipoServicio|null find($id, $lockMode = null, $lockVersion = null)
 * @method EquipoServicio|null findOneBy(array $criteria, array $orderBy = null)
 * @method EquipoServicio[]    findAll()
 * @method EquipoServicio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EquipoServicioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EquipoServicio::class);
    }

    // /**
    //  * @return EquipoServicio[] Returns an array of EquipoServicio objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EquipoServicio
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
