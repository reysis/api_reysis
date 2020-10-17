<?php

namespace App\Security\Voter;

use App\Entity\Marca;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class MarcaVoter extends Voter
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        /* Si Modificas alguna Operaci'on, para que el Voter
            la vea tienes que agregarla aqui por ejemplo:
            return in_array($atribute, ['POST', 'GET_SPECIFI', 'CUALQUIER_COSA'])
                && $subject instance of Marca;
        */
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['GET', 'POST', 'EDIT', 'ERASE' ])
            && $subject instanceof Marca;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        /**
         * @var Marca $subject
         */
        /*
         * Aqui tienes que agregar la logica de seguridad...
         * Si es Admin return true, sino return false... etc,
         * un case para cada Operacion Custom que realices
         * */
        switch ($attribute) {
            case 'GET':
                if(in_array('ROLE_ADMIN', $user->getRoles()) || in_array('ROLE_SECRETARIA', $user->getRoles()) || in_array('ROLE_TECNICO', $user->getRoles()))
                    return true;
                return false;
            case 'POST':
                if(in_array('ROLE_ADMIN', $user->getRoles()) || in_array('ROLE_SECRETARIA', $user->getRoles()) || in_array('ROLE_TECNICO', $user->getRoles()))
                    return true;
                return false;
            case 'EDIT':
                if(in_array('ROLE_ADMIN', $user->getRoles()) || in_array('ROLE_SECRETARIA', $user->getRoles()) || in_array('ROLE_TECNICO', $user->getRoles()))
                    return true;
                return false;
            case 'ERASE':
                if(in_array('ROLE_ADMIN', $user->getRoles()))
                    return true;
                return false;
        }

        throw new \Exception(sprint('Atributo no manejado "%s" ', $attribute));
    }
}
