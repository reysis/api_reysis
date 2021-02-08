<?php


namespace App\Serializer\Denormalizer;


use App\Entity\MediaObject;
use App\Repository\ServicioRepository;
use App\Repository\UserRepository;
use Symfony\Component\Serializer\Exception\BadMethodCallException;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Exception\ExtraAttributesException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Exception\RuntimeException;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\CacheableSupportsMethodInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class MediaObjectDenormalizer implements DenormalizerInterface, CacheableSupportsMethodInterface
{
    private ObjectNormalizer $normalizer;
    private UserRepository $userRepository;
    private ServicioRepository $servicioRepository;

    public function __construct(
        ObjectNormalizer $normalizer,
        UserRepository $userRepository,
        ServicioRepository $servicioRepository
    )
    {
        $this->normalizer = $normalizer;
        $this->userRepository = $userRepository;
        $this->servicioRepository = $servicioRepository;
    }

    public function hasCacheableSupportsMethod(): bool
    {
        return true;
    }

    public function denormalize($data, string $type, string $format = null, array $context = []): object
    {
        if(($context['item_operation_name'] ?? null)  === 'put' ){
            $context[AbstractObjectNormalizer::DEEP_OBJECT_TO_POPULATE] = true;
            $context[AbstractObjectNormalizer::OBJECT_TO_POPULATE]->setFilename($data['filename']);
            $context[AbstractObjectNormalizer::OBJECT_TO_POPULATE]->setData($data['data']);
        }else if( ($context['collection_operation_name'] ?? null) === 'post' ){
            $context[AbstractObjectNormalizer::OBJECT_TO_POPULATE] = $this->newMediaObject($data, $context);
        }

        return $this->normalizer->denormalize($data, $type, $format, $context);
    }

    public function supportsDenormalization($data, string $type, string $format = null): bool
    {
        return $type === MediaObject::class;
    }

    /**
     * @param $data
     */
    public function newMediaObject($data): MediaObject
    {
        $mediaObject = new MediaObject();
        $mediaObject->setFilename($data['filename']);
        $mediaObject->setData($data['data']);
        if($data['user'] ?? null)
            $mediaObject->setUser(
                $this->userRepository->findOneById($data['user'])
            );
        if($data['servicio'] ?? null)
            $mediaObject->setServicio(
               $this->servicioRepository->findOneById($data['servicio'])
            );

        return $mediaObject;
    }
}