<?php

namespace App\Repository;

use App\Entity\ExistenciasTecnico;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ExistenciasTecnico|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExistenciasTecnico|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExistenciasTecnico[]    findAll()
 * @method ExistenciasTecnico[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExistenciasTecnicoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExistenciasTecnico::class);
    }

    // /**
    //  * @return ExistenciasTecnico[] Returns an array of ExistenciasTecnico objects
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
    public function findOneBySomeField($value): ?ExistenciasTecnico
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
