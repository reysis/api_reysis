<?php


namespace App\DataProvider;


use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\DenormalizedIdentifiersAwareItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\MediaObject;
use App\Entity\Servicio;
use Vich\UploaderBundle\Storage\StorageInterface;

class ServiceDataProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface, DenormalizedIdentifiersAwareItemDataProviderInterface
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
        /**
         * @var Servicio[] $services
         */
        $arrayOfServices = $this->collectionDataProvider->getCollection($resourceClass, $operationName, $context);

        /**
         * @var Servicio $service
         * @var MediaObject $image
         */
        foreach ($arrayOfServices as $service){
            foreach ($service->getServiceImages() as $image) {
                $uri = $this->storage->resolveUri($image, 'file');
                dump($image,$uri);
                $image->setContentUrl($uri);
            }
        }

        return $arrayOfServices;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        /**
         * @var Servicio $service
         */
        $service = $this->itemDataProvider->getItem($resourceClass, $id, $operationName);

        if(!$service){
            return null;
        }

        foreach ($service->getServiceImages() as $mediaObject){
            $mediaObject->setContentUrl($this->storage->resolveUri($mediaObject, 'file'));
        }
        return $service;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === Servicio::class;
    }
}