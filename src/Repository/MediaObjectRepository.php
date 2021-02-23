<?php

namespace App\Repository;

use App\Entity\MediaObject;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Query\Parameter;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MediaObject|null find($id, $lockMode = null, $lockVersion = null)
 * @method MediaObject|null findOneBy(array $criteria, array $orderBy = null)
 * @method MediaObject[]    findAll()
 * @method MediaObject[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MediaObjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MediaObject::class);
    }

    /**
    * @return MediaObject[] Returns an array of MediaObject objects
    */
    public function findByOrphane($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.orphane = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    /**
     * @return MediaObject[] Returns an array of MediaObject objects
     */
    public function findByOldEditing($editing, $date)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.editing = :val AND m.createdAt < :howOld')
            ->setParameters(new ArrayCollection(array(
                  new Parameter('val', $editing),
                  new Parameter('howOld', $date)
            )))
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
            ;
    }

    /*
    public_html function findOneBySomeField($value): ?MediaObject
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
