<?php


namespace App\Security\Voter;


use App\Entity\Persona;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class PersonaVoter extends Voter
{

    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        return in_array($attribute, ['PERSONA_GET','PERSONA_ERASE', 'PERSONA_PUT'])
            && $subject instanceof Persona;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        dump($user, $subject);
        /**
         * @var Persona $subject
         */
        switch ($attribute){
            case 'PERSONA_ERASE':
            case 'PERSONA_GET':
            case 'PERSONA_PUT':
                if($this->security->isGranted('ROLE_ADMIN') || $subject->getUser() === $user )
                    return true;
                return false;
        }

        throw new \Exception(sprint('Atributo no manejado "%s" ', $atribute));
    }
}