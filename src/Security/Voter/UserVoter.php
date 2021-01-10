<?php


namespace App\Security\Voter;


use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{

    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        return in_array($attribute, ['USER_GET','USER_ERASE', 'USER_PUT'])
            && $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        /**
         * @var User $subject
         */
        switch ($attribute){
            case 'USER_ERASE':
                if($this->security->isGranted('ROLE_ADMIN'))
                    return true;
                return false;
            case 'USER_GET':
            case 'USER_PUT':
                if($this->security->isGranted('ROLE_ADMIN') || $subject === $user )
                    return true;
                return false;
        }

        throw new \Exception(sprint('Atributo no manejado "%s" ', $atribute));
    }
}