<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ControlPiezaServicioRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=ControlPiezaServicioRepository::class)
 */
class ControlPiezaServicio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Servicio", inversedBy="controlPiezaServicios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $servicio;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\RecursoTrabajador", inversedBy="controlPiezaServicios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $recursoTrabajador;

    /**
     * @ORM\Column(type="integer")
     */
    private $cantidad;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fecha;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(?Servicio $servicio): self
    {
        $this->servicio = $servicio;

        return $this;
    }

    public function getRecursoTrabajador(): ?RecursoTrabajador
    {
        return $this->recursoTrabajador;
    }

    public function setRecursoTrabajador(?RecursoTrabajador $recursoTrabajador): self
    {
        $this->recursoTrabajador = $recursoTrabajador;

        return $this;
    }

    public function getCantidad(): ?int
    {
        return $this->cantidad;
    }

    public function setCantidad(int $cantidad): self
    {
        $this->cantidad = $cantidad;

        return $this;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }
}
