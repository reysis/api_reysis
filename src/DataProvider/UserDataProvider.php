<?php


namespace App\DataProvider;


use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\DenormalizedIdentifiersAwareItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\MediaObject;
use App\Entity\User;
use App\Services\CustomUploaderHelper;

class UserDataProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface, DenormalizedIdentifiersAwareItemDataProviderInterface
{
    private CollectionDataProviderInterface $collectionDataProvider;
    private ItemDataProviderInterface $itemDataProvider;
    private CustomUploaderHelper $customUploaderHelper;

    public function __construct(
        CollectionDataProviderInterface $collectionDataProvider,
        CustomUploaderHelper $customUploaderHelper,
        ItemDataProviderInterface $itemDataProvider)
    {
        $this->collectionDataProvider = $collectionDataProvider;
        $this->itemDataProvider = $itemDataProvider;
        $this->customUploaderHelper = $customUploaderHelper;
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = [])
    {
        $arrayOfUsers = $this->collectionDataProvider->getCollection($resourceClass, $operationName, $context);

        /**
         * @var User $user
         * @var MediaObject $image
         */
        foreach ($arrayOfUsers as $user){
            $uri = $this->customUploaderHelper->getPublicPath($user->getProfilePicture()->getFilePath());
            $user->getProfilePicture()->setContentUrl($uri);
        }

        return $arrayOfUsers;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        /**
         * @var User $user
         */
        $user = $this->itemDataProvider->getItem($resourceClass, $id, $operationName);

        if(!$user){
            return null;
        }

        $user->getProfilePicture()->setContentUrl($this->customUploaderHelper->getPublicPath($user->getProfilePicture()->getFilePath()));

        return $user;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === User::class;
    }
}