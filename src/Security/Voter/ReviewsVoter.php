<?php


namespace App\Security\Voter;


use App\Entity\Reviews;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class ReviewsVoter extends Voter
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject)
    {
        return in_array($attribute, ['GET_SPECIFIC', 'PUT', 'DELETE'])
            && $subject instanceof Reviews;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        if(!$user instanceof UserInterface){
            return false;
        }

        /**
         * @var Reviews $subject
         */
        switch ($subject){
            case 'PUT':
            case 'GET_SPECIFIC':
            case 'DELETE':
                if(in_array('ROLE_ADMIN', $user->getRoles()) || $subject->getUser() === $user)
                    return true;
                return false;
        }

        throw new \Exception(sprint('Atributo no manejado "%s" ', $atribute));
    }
}