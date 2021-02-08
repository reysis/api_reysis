<?php


namespace App\DataProvider;


use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\DenormalizedIdentifiersAwareItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\MediaObject;
use App\Services\CustomUploaderHelper;
use Vich\UploaderBundle\Storage\StorageInterface;

class MediaObjectDataProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface, DenormalizedIdentifiersAwareItemDataProviderInterface
{
    private $collectionDataProvider;
    private $itemDataProvider;
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
        $mediaObjects = $this->collectionDataProvider->getCollection($resourceClass, $operationName, $context);

        /**
         * @var MediaObject $mediaObject
         */
        foreach ($mediaObjects as $mediaObject){
            $mediaObject->setContentUrl($this->customUploaderHelper->getPublicPath($mediaObject->getFilePath()));
        }
    }
    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        /**
         * @var MediaObject $mediaObject
         */
        $mediaObject = $this->itemDataProvider->getItem($resourceClass, $id, $operationName);

        if(!$mediaObject){
            return null;
        }
        $mediaObject->setContentUrl($this->customUploaderHelper->getPublicPath($mediaObject->getFilePath()));

        return $mediaObject;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === MediaObject::class;
    }
}