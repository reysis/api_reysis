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
        $services = $this->collectionDataProvider->getCollection($resourceClass, $operationName, $context);

        foreach ($services as $service){
            $service->getServiceImage()->setContentUrl($this->storage->resolveUri($service->getServiceImage(), 'file'));
        }

        return $services;
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

        $service->getServiceImage()->setContentUrl($this->storage->resolveUri($service->getServiceImage(), 'file'));
<<<<<<< HEAD

=======
        dump($service);
>>>>>>> 86e250389ab11f18b2c4bc89a904ec9d2aa02f5b
        return $service;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === Servicio::class;
    }
}