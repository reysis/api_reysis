<?php

namespace App\Validator;

use App\Repository\AvailableDateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class AvailableDateValidator extends ConstraintValidator
{

    private AvailableDateRepository $availableDateRepository;

    public function __construct(
        AvailableDateRepository $availableDateRepository
    )
    {
        $this->availableDateRepository = $availableDateRepository;
    }

    /**
     * @param mixed $value
     * @param Constraint $constraint
     */
    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\AvailableDate */

        if (null === $value || '' === $value) {
            return;
        }

        $availableDate = $this->availableDateRepository->findOneByDate($value);

        if(!$availableDate){
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value->format('Y-m-d H:i:s'))
                ->addViolation();
        }

        if($availableDate->getAmountAvailable() === 0){
            // TODO: implement the validation here
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value->format('Y-m-d H:i:s'))
                ->addViolation();
        }
    }
}
