<?php


namespace App\EventListener;

use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Security;

class AuthenticationSuccessListener
{
    private $requestStack;
    private $security;
    private UserRepository $userRepository;

    public function __construct(
        RequestStack $requestStack,
        Security $security,
        UserRepository $userRepository
    )
    {
        $this->requestStack = $requestStack;
        $this->security = $security;
        $this->userRepository = $userRepository;
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();

        /**
         * @var User $user
         */
        $user = $this->userRepository->findOneByUsername($event->getUser()->getUsername());
        $user->setLastLoggued(new \DateTime());
        dump($user, $data, $event);

        $data['location'] = '/api/users/'.$user->getId();

        $event->setData($data);
    }
}