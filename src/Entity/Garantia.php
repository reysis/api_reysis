<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\GarantiaRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=GarantiaRepository::class)
 */
class Garantia
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Servicio", inversedBy="garantias")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $servicio;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $noServicio;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fechaInicio;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $totalHoraTrabajada;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $fechaTerminacion;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $fechaEntrega;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $costo;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $estado;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Trabajador", inversedBy="garantias")
     */
    private $trabajador;

    /**
     * @ORM\Column(type="boolean")
     */
    private $FT;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ControlPiezaGarantia", mappedBy="garantia")
     */
    private $controlPiezaGarantias;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TrasladoGarantia", mappedBy="garantia")
     */
    private $trasladoGarantias;

    public function __construct()
    {
        $this->controlPiezaGarantias = new ArrayCollection();
        $this->trasladoGarantias = new ArrayCollection();
    }

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

    public function getNoServicio(): ?string
    {
        return $this->noServicio;
    }

    public function setNoServicio(string $noServicio): self
    {
        $this->noServicio = $noServicio;

        return $this;
    }

    public function getFechaInicio(): ?\DateTimeInterface
    {
        return $this->fechaInicio;
    }

    public function setFechaInicio(\DateTimeInterface $fechaInicio): self
    {
        $this->fechaInicio = $fechaInicio;

        return $this;
    }

    public function getTotalHoraTrabajada(): ?int
    {
        return $this->totalHoraTrabajada;
    }

    public function setTotalHoraTrabajada(?int $totalHoraTrabajada): self
    {
        $this->totalHoraTrabajada = $totalHoraTrabajada;

        return $this;
    }

    public function getFechaTerminacion(): ?\DateTimeInterface
    {
        return $this->fechaTerminacion;
    }

    public function setFechaTerminacion(?\DateTimeInterface $fechaTerminacion): self
    {
        $this->fechaTerminacion = $fechaTerminacion;

        return $this;
    }

    public function getFechaEntrega(): ?\DateTimeInterface
    {
        return $this->fechaEntrega;
    }

    public function setFechaEntrega(?\DateTimeInterface $fechaEntrega): self
    {
        $this->fechaEntrega = $fechaEntrega;

        return $this;
    }

    public function getCosto(): ?float
    {
        return $this->costo;
    }

    public function setCosto(?float $costo): self
    {
        $this->costo = $costo;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
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

    public function getFT(): ?bool
    {
        return $this->FT;
    }

    public function setFT(bool $FT): self
    {
        $this->FT = $FT;

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
            $controlPiezaGarantia->setGarantia($this);
        }

        return $this;
    }

    public function removeControlPiezaGarantia(ControlPiezaGarantia $controlPiezaGarantia): self
    {
        if ($this->controlPiezaGarantias->contains($controlPiezaGarantia)) {
            $this->controlPiezaGarantias->removeElement($controlPiezaGarantia);
            // set the owning side to null (unless already changed)
            if ($controlPiezaGarantia->getGarantia() === $this) {
                $controlPiezaGarantia->setGarantia(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TrasladoGarantia[]
     */
    public function getTrasladoGarantias(): Collection
    {
        return $this->trasladoGarantias;
    }

    public function addTrasladoGarantia(TrasladoGarantia $trasladoGarantia): self
    {
        if (!$this->trasladoGarantias->contains($trasladoGarantia)) {
            $this->trasladoGarantias[] = $trasladoGarantia;
            $trasladoGarantia->setGarantia($this);
        }

        return $this;
    }

    public function removeTrasladoGarantia(TrasladoGarantia $trasladoGarantia): self
    {
        if ($this->trasladoGarantias->contains($trasladoGarantia)) {
            $this->trasladoGarantias->removeElement($trasladoGarantia);
            // set the owning side to null (unless already changed)
            if ($trasladoGarantia->getGarantia() === $this) {
                $trasladoGarantia->setGarantia(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
       return $this->getNoServicio();
    }
}
