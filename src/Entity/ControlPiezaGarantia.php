<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ControlPiezaGarantiaRepository;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ControlPiezaGarantiaRepository::class)
 */
class ControlPiezaGarantia
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Garantia", inversedBy="controlPiezaGarantias")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $garantia;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\RecursoTrabajador", inversedBy="controlPiezaGarantias")
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

    public function getGarantia(): ?Garantia
    {
        return $this->garantia;
    }

    public function setGarantia(?Garantia $garantia): self
    {
        $this->garantia = $garantia;

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
