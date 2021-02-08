<?php


namespace App\Security\Voter;


use App\Entity\MediaObject;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class MediaObjectVoter extends Voter
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject)
    {
        //dump($attribute, $subject);
        return in_array($attribute, [
                'MEDIA_OBJECT_ERASE',
                'MEDIA_OBJECT_GET',
                'MEDIA_OBJECT_PUT',
                'MEDIA_OBJECT_GET_SINGLE',
                'MEDIA_OBJECT_POST'
            ])
            && $subject instanceof MediaObject;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        if(!$user instanceof User)
            return false;

        if($this->security->isGranted('ROLE_ADMIN'))
            return true;

        /**
         * @var MediaObject $subject
         */
        switch ($attribute){
            case 'MEDIA_OBJECT_GET':
                if(
                    ($this->security->isGranted('ROLE_USER')
                        &&$subject->getUser() === $user)
                    ||
                    ($subject->getServicio() !== null)
                ){
                    return true;
                }
                return false;
            case 'MEDIA_OBJECT_PUT':
                if($this->security->isGranted('ROLE_USER') && $subject->getUser() && $subject->getUser() === $user)
                    return true;
                return false;
            case 'MEDIA_OBJECT_ERASE':
            case 'MEDIA_OBJECT_POST':
            case 'MEDIA_OBJECT_GET_SINGLE':
                if($this->security->isGranted('ROLE_USER') && $subject->getUser())
                    return true;
                return false;

        }

        throw new \Exception(sprint('Atributo no manejado "%s" ', $atribute));
    }
}