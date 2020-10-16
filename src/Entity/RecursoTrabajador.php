<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\RecursoTrabajadorRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=RecursoTrabajadorRepository::class)
 */
class RecursoTrabajador
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Trabajador", inversedBy="recursoTrabajadors")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $trabajador;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Pieza", inversedBy="recursoTrabajadors")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $pieza;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ControlPiezaServicio", mappedBy="recursoTrabajador")
     */
    private $controlPiezaServicios;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ControlPiezaGarantia", mappedBy="recursoTrabajador")
     */
    private $controlPiezaGarantias;

    public function __construct()
    {
        $this->controlPiezaServicios = new ArrayCollection();
        $this->controlPiezaGarantias = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTrabajador(): ?Trabajador
    {
        return $this->trabajador;
    }

    public function setTrabajador(?Trabajador $trabajador): self
    {
        $this->trabajador = $trabajador;

        return $this;
    }

    public function getPieza(): ?Pieza
    {
        return $this->pieza;
    }

    public function setPieza(?Pieza $pieza): self
    {
        $this->pieza = $pieza;

        return $this;
    }

    /**
     * @return Collection|ControlPiezaServicio[]
     */
    public function getControlPiezaServicios(): Collection
    {
        return $this->controlPiezaServicios;
    }

    public function addControlPiezaServicio(ControlPiezaServicio $controlPiezaServicio): self
    {
        if (!$this->controlPiezaServicios->contains($controlPiezaServicio)) {
            $this->controlPiezaServicios[] = $controlPiezaServicio;
            $controlPiezaServicio->setRecursoTrabajador($this);
        }

        return $this;
    }

    public function removeControlPiezaServicio(ControlPiezaServicio $controlPiezaServicio): self
    {
        if ($this->controlPiezaServicios->contains($controlPiezaServicio)) {
            $this->controlPiezaServicios->removeElement($controlPiezaServicio);
            // set the owning side to null (unless already changed)
            if ($controlPiezaServicio->getRecursoTrabajador() === $this) {
                $controlPiezaServicio->setRecursoTrabajador(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ControlPiezaGarantia[]
     */
    public function getControlPiezaGarantias(): Collection
    {
        return $this->controlPiezaGarantias;
    }

    public function addControlPiezaGarantia(ControlPiezaGarantia $controlPiezaGarantia): self
    {
        if (!$this->controlPiezaGarantias->contains($controlPiezaGarantia)) {
            $this->controlPiezaGarantias[] = $controlPiezaGarantia;
            $controlPiezaGarantia->setRecursoTrabajador($this);
        }

        return $this;
    }

    public function removeControlPiezaGarantia(ControlPiezaGarantia $controlPiezaGarantia): self
    {
        if ($this->controlPiezaGarantias->contains($controlPiezaGarantia)) {
            $this->controlPiezaGarantias->removeElement($controlPiezaGarantia);
            // set the owning side to null (unless already changed)
            if ($controlPiezaGarantia->getRecursoTrabajador() === $this) {
                $controlPiezaGarantia->setRecursoTrabajador(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
        return $this->getPieza();
    }
}
