<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TrasladoGarantiaRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=TrasladoGarantiaRepository::class)
 */
class TrasladoGarantia extends Traslado
{
    protected $discriminante = self::TRASLADOGARANTIA;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Garantia", inversedBy="trasladoGarantias")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $garantia;

    public function getGarantia(): ?Garantia
    {
        return $this->garantia;
    }

    public function setGarantia(?Garantia $garantia): self
    {
        $this->garantia = $garantia;

        return $this;
    }
}
