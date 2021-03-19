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
        return in_array($attribute, ['REVIEW_PUT', 'ERASE', 'POST_REVIEW'])
            && $subject instanceof Reviews;
    }

    /**
     * @param string $attribute
     * @param Reviews $subject
     * @param TokenInterface $token
     * @return bool
     * @throws \Exception
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        if(!$user instanceof UserInterface){
            return false;
        }

        if($this->security->isGranted('ROLE_ADMIN'))
            return true;

        switch ($attribute){
            case 'REVIEW_PUT':
            case 'POST_REVIEW':
            case 'ERASE':
                if($this->security->isGranted('ROLE_USER') && $subject->getUser() === $user)
                    return true;
                return false;
        }

        throw new \Exception(sprintf('Atributo no manejado "%s" ', $attribute));
    }
}