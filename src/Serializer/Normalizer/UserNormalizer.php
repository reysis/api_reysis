<?php

namespace App\Serializer\Normalizer;

use App\Entity\User;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Exception\BadMethodCallException;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Exception\ExtraAttributesException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Exception\RuntimeException;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;
use Symfony\Component\Serializer\Normalizer\CacheableSupportsMethodInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;

class UserNormalizer implements ContextAwareNormalizerInterface, CacheableSupportsMethodInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'USER_NORMALIZER_ALREADY_CALLED';
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * Funcion para normalizar un Usuario y agregar grupos de seguridad para mostrar campos propios de cada usuario
     *
     * @param User $object
     * @param [type] $format
     * @param array $context
     * @return array
     */
    public function normalize($object, $format = null, array $context = array()): array
    {
        $isOwner = $this->userIsOwner($object);
        if(in_array('ROLE_WORKER', $object->getRoles())){
            $context['groups'][] = 'media:read';
        }
        if($isOwner){
            $context['groups'][] = 'owner:read';
        }

        $context[self::ALREADY_CALLED] = true;
        $data = $this->normalizer->normalize($object, $format, $context);

        // Here: add, edit, or delete some data
        $data['isMe'] = $isOwner;
        return $data;
    }

    public function supportsNormalization($data, $format = null, array $context = []): bool
    {
        if(isset($context[self::ALREADY_CALLED])){
            return false;
        }
        return $data instanceof User;
    }

    public function hasCacheableSupportsMethod(): bool
    {
        return false;
    }

    private function userIsOwner(User $user): bool
    {
        /** @var User|null $autheticatedUser*/
        $autheticatedUser = $this->security->getUser();

        if(!$autheticatedUser){
            return false;
        }

        return $autheticatedUser->getUsername() === $user->getUsername();
    }
}
