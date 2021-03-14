<?php


namespace App\DataProvider;


use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use ApiPlatform\Core\Exception\ResourceClassNotSupportedException;
use App\Entity\MarkReadNotification;

class MarkReadNotificationDataProvider implements CollectionDataProviderInterface, ItemDataProviderInterface,RestrictedDataProviderInterface
{

    public function getCollection(string $resourceClass, string $operationName = null)
    {
        $notificationsMarked = new MarkReadNotification();
        $notificationsMarked->setNotifications([]);
        $notificationsMarked->setIri(rand() % 100);

        return [$notificationsMarked];
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === MarkReadNotification::class;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        // TODO: Implement getItem() method.
    }
}