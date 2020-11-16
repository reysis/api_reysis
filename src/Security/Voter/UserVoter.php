<?php


namespace App\Security\Voter;


use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{

    protected function supports(string $attribute, $subject)
    {
        return in_array($attribute, ['GET','GET_SINGLE', 'PUT'])
            && $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if(!$user instanceof UserInterface && $attribute === 'POST')
            return true;
        else if( !$user instanceof UserInterface && $attribute != 'POST')
            return false;

        /**
         * @var User $subject
         */
        switch ($attribute){
            case 'GET':
                if(in_array('ROLE_ADMIN', $user->getRoles()))
                    return true;
                return false;
            case 'PUT':
            case 'GET_SINGLE':
                if(in_array('ROLE_ADMIN', $user->getRoles()) || $subject->getUsername() === $user->getUsername() )
                    return true;
                return false;
        }

        throw new \Exception(sprint('Atributo no manejado "%s" ', $atribute));
    }
}