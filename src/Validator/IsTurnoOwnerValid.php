<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class IsTurnoOwnerValid extends Constraint
{
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $message = 'No puede crear un turno para otro usuario';

    public $anounymousMessage = 'No puede crear un turno a menos que este authenticado en la aplicació';
}
