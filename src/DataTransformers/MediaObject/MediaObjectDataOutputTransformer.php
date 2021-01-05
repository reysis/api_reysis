<?php


namespace App\DataTransformers\MediaObject;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\DTO\MediaObject\MediaObjectOutput;
use App\Entity\MediaObject;
use Vich\UploaderBundle\Storage\StorageInterface;

class MediaObjectDataOutputTransformer implements DataTransformerInterface
{
    private StorageInterface $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    /**
     * {@inheritdoc}
     * @param MediaObject $mediaObject
     */
    public function transform($mediaObject, string $to, array $context = [])
    {
        $mediaObjectOutput = new MediaObjectOutput();
        $mediaObjectOutput->contentUrl = $this->storage->resolveUri($mediaObject,'file');

        return $mediaObjectOutput;
    }

    /**
     * {@inheritdoc}
     * @param array|object $data
     * @param string $to
     * @param array $context
     * @return bool
     */
    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return $data instanceof MediaObject && $to === MediaObjectOutput::class;
    }
}