<?php

namespace App\Repository;

use App\Entity\TipoEquipo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TipoEquipo|null find($id, $lockMode = null, $lockVersion = null)
 * @method TipoEquipo|null findOneBy(array $criteria, array $orderBy = null)
 * @method TipoEquipo[]    findAll()
 * @method TipoEquipo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TipoEquipoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TipoEquipo::class);
    }

    // /**
    //  * @return TipoEquipo[] Returns an array of TipoEquipo objects
    //  */
    /*
    public_html function findByExampleField($value)
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
    public_html function findOneBySomeField($value): ?TipoEquipo
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
