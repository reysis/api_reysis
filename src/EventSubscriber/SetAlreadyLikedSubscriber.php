<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Security\Core\Security;

class SetAlreadyLikedSubscriber implements EventSubscriberInterface
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function onRequestEvent(RequestEvent $event)
    {
        // ...
    }

    public static function getSubscribedEvents()
    {
        return [
            RequestEvent::class => 'onRequestEvent',
        ];
    }
}
