<?php


namespace App\DataProvider;


use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\DenormalizedIdentifiersAwareItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\MediaObject;
use App\Entity\Reviews;
use App\Entity\User;
use App\Services\CustomUploaderHelper;

class ReviewsDataProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface, DenormalizedIdentifiersAwareItemDataProviderInterface
{

    private CollectionDataProviderInterface $collectionDataProvider;
    private CustomUploaderHelper $customUploaderHelper;
    private ItemDataProviderInterface $itemDataProvider;

    public function __construct(
        CollectionDataProviderInterface $collectionDataProvider,
        CustomUploaderHelper $customUploaderHelper,
        ItemDataProviderInterface $itemDataProvider)
    {

        $this->collectionDataProvider = $collectionDataProvider;
        $this->customUploaderHelper = $customUploaderHelper;
        $this->itemDataProvider = $itemDataProvider;
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = [])
    {
        /**
         * @var Reviews[] $arrayOfReviews
         */
        $arrayOfReviews = $this->collectionDataProvider->getCollection($resourceClass, $operationName, $context);

        foreach ($arrayOfReviews as $review){
            $uri = $this->customUploaderHelper->getPublicPath($review->getUser()->getProfilePicture()->getFilePath());
            $review->getUser()->getProfilePicture()->setContentUrl($uri);
        }

        return $arrayOfReviews;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        /**
         * @var Reviews $review
         */
        $review = $this->itemDataProvider->getItem($resourceClass, $id, $operationName);

        if(!$review){
            return null;
        }

        $review->getUser()->getProfilePicture()->setContentUrl($this->customUploaderHelper->getPublicPath($review->getUser()->getProfilePicture()->getFilePath()));

        return $review;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === Reviews::class;
    }
}