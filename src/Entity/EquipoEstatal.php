<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\EquipoEstatalRepository;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=EquipoEstatalRepository::class)
 */
class EquipoEstatal extends Equipo
{
    protected $discriminante = self::EQUIPOESTATAL;
    /**
     * @ORM\Column(type="integer")
     */
    private $numeroInventario;

    public function getNumeroInventario(): ?int
    {
        return $this->numeroInventario;
    }

    public function setNumeroInventario(int $numeroInventario): self
    {
        $this->numeroInventario = $numeroInventario;

        return $this;
    }
}
