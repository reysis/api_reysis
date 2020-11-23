<?php

namespace App\Repository;

use App\Entity\TipoUsuario;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TipoUsuario|null find($id, $lockMode = null, $lockVersion = null)
 * @method TipoUsuario|null findOneBy(array $criteria, array $orderBy = null)
 * @method TipoUsuario[]    findAll()
 * @method TipoUsuario[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TipoUsuarioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TipoUsuario::class);
    }

    // /**
    //  * @return TipoUsuario[] Returns an array of TipoUsuario objects
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
    public_html function findOneBySomeField($value): ?TipoUsuario
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