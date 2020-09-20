<?php

namespace App\Repository;

use App\Entity\PreguntaFrecuente;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PreguntaFrecuente|null find($id, $lockMode = null, $lockVersion = null)
 * @method PreguntaFrecuente|null findOneBy(array $criteria, array $orderBy = null)
 * @method PreguntaFrecuente[]    findAll()
 * @method PreguntaFrecuente[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PreguntaFrecuenteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PreguntaFrecuente::class);
    }

    // /**
    //  * @return PreguntaFrecuente[] Returns an array of PreguntaFrecuente objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PreguntaFrecuente
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
