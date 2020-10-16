<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PiezaRepository;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=PiezaRepository::class)
 */
class Pieza
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TipoPieza", inversedBy="piezas")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $tipoPieza;

    /**
     * @ORM\Column(type="integer")
     */
    private $cantidad;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fecha;

    /**
     * @ORM\Column(type="integer", unique=true)
     */
    private $codigo;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $descripcion;

    /**
     * @ORM\Column(type="float")
     */
    private $costoUnidad;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecursoExtraido", mappedBy="pieza")
     */
    private $recursoExtraidos;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecursoTrabajador", mappedBy="pieza")
     */
    private $recursoTrabajadors;

    /**
     * @ORM\OneToMany(targetEntity=HistorialTransferencia::class, mappedBy="pieza")
     */
    private $historialTransferencias;

    public function __construct()
    {
        $this->recursoExtraidos = new ArrayCollection();
        $this->recursoTrabajadors = new ArrayCollection();
        $this->historialTransferencias = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTipoPieza(): ?TipoPieza
    {
        return $this->tipoPieza;
    }

    public function setTipoPieza(?TipoPieza $tipoPieza): self
    {
        $this->tipoPieza = $tipoPieza;

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

    public function getCodigo(): ?int
    {
        return $this->codigo;
    }

    public function setCodigo(int $codigo): self
    {
        $this->codigo = $codigo;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getCostoUnidad(): ?float
    {
        return $this->costoUnidad;
    }

    public function setCostoUnidad(float $costoUnidad): self
    {
        $this->costoUnidad = $costoUnidad;

        return $this;
    }

    /**
     * @return Collection|RecursoExtraido[]
     */
    public function getRecursoExtraidos(): Collection
    {
        return $this->recursoExtraidos;
    }

    public function addRecursoExtraido(RecursoExtraido $recursoExtraido): self
    {
        if (!$this->recursoExtraidos->contains($recursoExtraido)) {
            $this->recursoExtraidos[] = $recursoExtraido;
            $recursoExtraido->setPieza($this);
        }

        return $this;
    }

    public function removeRecursoExtraido(RecursoExtraido $recursoExtraido): self
    {
        if ($this->recursoExtraidos->contains($recursoExtraido)) {
            $this->recursoExtraidos->removeElement($recursoExtraido);
            // set the owning side to null (unless already changed)
            if ($recursoExtraido->getPieza() === $this) {
                $recursoExtraido->setPieza(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|RecursoTrabajador[]
     */
    public function getRecursoTrabajadors(): Collection
    {
        return $this->recursoTrabajadors;
    }

    public function addRecursoTrabajador(RecursoTrabajador $recursoTrabajador): self
    {
        if (!$this->recursoTrabajadors->contains($recursoTrabajador)) {
            $this->recursoTrabajadors[] = $recursoTrabajador;
            $recursoTrabajador->setPieza($this);
        }

        return $this;
    }

    public function removeRecursoTrabajador(RecursoTrabajador $recursoTrabajador): self
    {
        if ($this->recursoTrabajadors->contains($recursoTrabajador)) {
            $this->recursoTrabajadors->removeElement($recursoTrabajador);
            // set the owning side to null (unless already changed)
            if ($recursoTrabajador->getPieza() === $this) {
                $recursoTrabajador->setPieza(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
        return $this->getCodigo().' - '.$this->getTipoPieza();
    }

    /**
     * @return Collection|HistorialTransferencia[]
     */
    public function getHistorialTransferencias(): Collection
    {
        return $this->historialTransferencias;
    }

    public function addHistorialTransferencia(HistorialTransferencia $historialTransferencia): self
    {
        if (!$this->historialTransferencias->contains($historialTransferencia)) {
            $this->historialTransferencias[] = $historialTransferencia;
            $historialTransferencia->setPieza($this);
        }

        return $this;
    }

    public function removeHistorialTransferencia(HistorialTransferencia $historialTransferencia): self
    {
        if ($this->historialTransferencias->contains($historialTransferencia)) {
            $this->historialTransferencias->removeElement($historialTransferencia);
            // set the owning side to null (unless already changed)
            if ($historialTransferencia->getPieza() === $this) {
                $historialTransferencia->setPieza(null);
            }
        }

        return $this;
    }
}
