<?php

namespace App\Validator;

use App\Entity\User;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class IsTurnoOwnerValidValidator extends ConstraintValidator
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @param User $value
     * @param Constraint $constraint
     */
    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\IsTurnoOwnerValid */

        if (null === $value || '' === $value) {
            return;
        }

        if($this->security->isGranted('ROLE_ADMIN')){
            return;
        }

        $user = $this->security->getUser();
        if(!$user instanceof User){
            $this->context->buildViolation($constraint->anounymousMessage)
                ->addViolation();
        }

        if($value !== $user){
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
