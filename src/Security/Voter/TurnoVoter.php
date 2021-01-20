<?php

namespace App\Security\Voter;

use App\Entity\Turno;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Security;

class TurnoVoter extends Voter
{
    private $security = null;

    private $userRepository;

    public function __construct(Security $security, UserRepository $userRepository)
    {
        $this->security = $security;
        $this->userRepository = $userRepository;
    }
    protected function supports($attribute, $subject)
    {
        return in_array($attribute, ['ERASE', 'EDIT', 'GET_SPECIFIC'])
            && $subject instanceof Turno;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }
        /**
         * @var Turno $subject
         */
        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'EDIT':
            case 'ERASE':
            case 'GET_SPECIFIC':
                if($subject->getUser() === $user || $this->security->isGranted('ROLE_ADMIN'))
                    return true;
                return false;
        }

        throw new \Exception(sprintf('Atributo no manejado "%s" ', $attribute));
    }
}
