<?php


namespace App\Entity;

use ApiPlatform\Core\Action\NotFoundAction;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class Statistics
 * @ApiResource(
 *     normalizationContext={"groups"={"statistics:read"}},
 *     itemOperations={
 *          "get" = {
 *              "method" = "GET",
 *              "controller"=NotFoundAction::class,
 *              "read" = false,
 *              "output"=false
 *          },
 *     },
 *     collectionOperations={
 *          "get",
 *     }
 * )
 */
class Statistics
{
    /**
     * @ApiProperty(identifier=true)
     */
    public $id;

    /**
     * @Groups({"statistics:read"})
     */
    public $yearsOfExperience;

    /**
     * @Groups({"statistics:read"})
     */
    public $mediaNumbersOfClients;

    /**
     * @Groups({"statistics:read"})
     */
    public $mediaRating;

    /**
     * Statistics constructor.
     */
    public function __construct(int $yearsOfExperience,int $mediaNumbersOfClients,float $mediaRating)
    {
        $this->yearsOfExperience = $yearsOfExperience;
        $this->mediaNumbersOfClients = $mediaNumbersOfClients;
        $this->mediaRating = $mediaRating;
    }


}