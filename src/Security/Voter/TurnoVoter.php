<?php

namespace App\Security\Voter;

use App\Entity\Turno;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Security;

class TurnoVoter extends Voter
{
    private $security = null;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }
    protected function supports($attribute, $subject)
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['ERASE', 'EDIT', 'GET_SPECIFIC'])
            && $subject instanceof Turno;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
/*        if (!$user instanceof UserInterface) {
            return false;
        }*/
  
        dump( $user->getRoles() );
        /**
         * @var Turno $subject
         */
        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'EDIT':
            case 'GET_SPECIFC':
                if($subject->getPersonaCitada() === $user || in_array('ROLE_ADMIN', $user->getRoles()))
                    return true;
                return false;
            case 'ERASE':
                if(in_array('ROLE_ADMIN', $user->getRoles()))
                    return true;
                return false;
        }

        throw new \Exception(sprint('Atributo no manejado "%s" ', $atribute));
    }
}
