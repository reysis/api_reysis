<?php

namespace App\Validator;

use App\Entity\User;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class IsValidMediaObjectValidator extends ConstraintValidator
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\IsValidMediaObject */

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
    }
}
