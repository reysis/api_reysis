<?php

namespace App\Validator;

use App\Entity\Turno;
use App\Entity\TurnoDisponible;
use App\Repository\AvailableDateRepository;
use App\Repository\TurnoDisponibleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class AvailableDateValidator extends ConstraintValidator
{
    private EntityManagerInterface $entityManager;
    private TurnoDisponibleRepository $turnoDisponibleRepository;

    public function __construct(
        TurnoDisponibleRepository $turnoDisponibleRepository,
        EntityManagerInterface $entityManager
    )
    {
        $this->entityManager = $entityManager;
        $this->turnoDisponibleRepository = $turnoDisponibleRepository;
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
            if($value->getDetalles() === $oldObject['detalles']){
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
        if ($value->getDetalles()->getAmountAvailable() === 0) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value->getFecha()->format('Y-m-d H:i:s'))
                ->addViolation();
            return;
        }
    }
}
