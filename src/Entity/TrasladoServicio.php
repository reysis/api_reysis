<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TrasladoServicioRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=TrasladoServicioRepository::class)
 */
class TrasladoServicio extends Traslado
{
    protected $discriminante = self::TRASLADOSERVICIO;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Servicio", inversedBy="trasladoServicios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $servicio;

    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(?Servicio $servicio): self
    {
        $this->servicio = $servicio;

        return $this;
    }
}
