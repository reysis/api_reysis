<?php

namespace App\Security\Voter;

use App\Entity\TiposServicios;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class TiposServiciosVoter extends Voter
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['POST'])
            && $subject instanceof TiposServicios;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        /**
         * @var TiposServicios $subject
         */
        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'POST':
                if(in_array('ROLE_ADMIN', $user->getRoles()))
                    return true;
                return false;
        }

        return false;
    }
}
