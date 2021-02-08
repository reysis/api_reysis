<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class IsValidMediaObject extends Constraint
{
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $message = 'The value "{{ value }}" is not valid.';

    public $emptyMessage = "Este campo no puede estar vacio";

    public $anounymousMessage = "Debe estar autenticado para crear este recurso";
}
