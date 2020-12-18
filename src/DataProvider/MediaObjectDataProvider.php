<?php


namespace App\DataProvider;


use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\DenormalizedIdentifiersAwareItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\MediaObject;
use Vich\UploaderBundle\Storage\StorageInterface;

class MediaObjectDataProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface, DenormalizedIdentifiersAwareItemDataProviderInterface
{
    private $storage;
    private $collectionDataProvider;
    private $itemDataProvider;

    public function __construct(CollectionDataProviderInterface $collectionDataProvider,StorageInterface $storage, ItemDataProviderInterface $itemDataProvider)
    {
        $this->storage = $storage;
        $this->collectionDataProvider = $collectionDataProvider;
        $this->itemDataProvider = $itemDataProvider;
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = [])
    {
        $mediaObjects = $this->collectionDataProvider->getCollection($resourceClass, $operationName, $context);

        /**
         * @var MediaObject $mediaObject
         */
        foreach ($mediaObjects as $mediaObject){
            $mediaObject->setContentUrl($this->storage->resolveUri($mediaObject, 'file'));
        }
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        $mediaObject = $this->collectionDataProvider->getItem($resourceClass, $id, $operationName);

        if(!$mediaObject){
            return null;
        }
        $mediaObject->setContentUrl($this->storage->resolveUri($mediaObject, 'file'));

        return $mediaObject;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === MediaObject::class;
    }
}