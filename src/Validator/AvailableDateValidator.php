<?php

namespace App\Validator;

use App\Entity\Turno;
use App\Repository\AvailableDateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class AvailableDateValidator extends ConstraintValidator
{

    private AvailableDateRepository $availableDateRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(
        AvailableDateRepository $availableDateRepository,
        EntityManagerInterface $entityManager
    )
    {
        $this->availableDateRepository = $availableDateRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @param Turno $value
     * @param Constraint $constraint
     */
    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\AvailableDate */

        if (null === $value || '' === $value) {
            return;
        }
        /**
         * @var Turno $oldObject
         */
        $oldObject = $this->entityManager
            ->getUnitOfWork()
            ->getOriginalEntityData($value);


        if($oldObject === []) {
            //POST Operation
            $this->checkDisponibility($value, $constraint);
        }else{
            //PUT operation
            if($value->getFecha() === $oldObject['fecha']){
                return;
            }else{
                $this->checkDisponibility($value, $constraint);
            }
        }

    }

    /**
     * @param Turno $value
     * @param AvailableDate $constraint
     */
    public function checkDisponibility($value, AvailableDate $constraint): void
    {
        $availableDate = $this->availableDateRepository->findOneByDate($value->getFecha());
        if (!$availableDate) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value->getFecha()->format('Y-m-d H:i:s'))
                ->addViolation();
            return;
        }

        if ($availableDate->getAmountAvailable() === 0) {
            // TODO: implement the validation here
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value->getFecha()->format('Y-m-d H:i:s'))
                ->addViolation();
            return;
        }
    }
}
