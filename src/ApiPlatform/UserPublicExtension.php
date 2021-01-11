<?php


namespace App\ApiPlatform;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class UserPublicExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        if($resourceClass !== User::class){
            return;
        }
        if($this->security->isGranted('ROLE_ADMIN'))
            return;
        $this->addWhere($resourceClass, $queryBuilder);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        if($resourceClass !== User::class){
            return;
        }
        if($this->security->isGranted('ROLE_ADMIN'))
            return;

        if(($context['request_uri'] ?? null) !== '/api/users'){
            return;
        }

        if(!$this->security->getUser()){
            return;
        }else{
            if($queryBuilder->getParameters()->getValues()[0]->getValue() === $this->security->getUser()->getId()) {
                return;
            }else{
                $rootAlias = $queryBuilder->getRootAliases()[0];
                $queryBuilder->andWhere(sprintf('%s.isPublic = :isPublic', $rootAlias))
                    ->setParameter('isPublic', true);
            }
        }
    }

    /**
     * @param string $resourceClass
     * @param QueryBuilder $queryBuilder
     */
    public function addWhere(string $resourceClass, QueryBuilder $queryBuilder): void
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.isPublic = :isPublic', $rootAlias))
            ->setParameter('isPublic', true);
    }
}