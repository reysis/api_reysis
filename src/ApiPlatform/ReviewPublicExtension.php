<?php


namespace App\ApiPlatform;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Reviews;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class ReviewPublicExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    /**
     * @var Security
     */
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($resourceClass, $queryBuilder);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($resourceClass, $queryBuilder);
    }

    /**
     * @param string $resourceClass
     * @param QueryBuilder $queryBuilder
     */
    public function addWhere(string $resourceClass, QueryBuilder $queryBuilder): void
    {
        if ($resourceClass !== Reviews::class)
            return;

        if ($this->security->isGranted('ROLE_ADMIN')) {
            return;
        }

        /*$rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.isPublic = :isPublic', $rootAlias))
            ->setParameter('isPublic', true);*/
    }
}