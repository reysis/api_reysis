<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ServicioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ServicioRepository::class)
 */
class OrdenServicio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $noServicio;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fechaInicio;

    /**
     * @ORM\Column(type="integer")
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
     * @ORM\Column(type="string", length=20)
     */
    private $estado;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $defecto;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $FT;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $descripcion;

    /**
     * @ORM\ManyToOne(targetEntity=Servicio::class, inversedBy="servicioPrestado")
     * @ORM\JoinColumn(nullable=false)
     */
    private $servicio;

    /**
     * @ORM\ManyToOne(targetEntity=Equipo::class, inversedBy="servicios")
     */
    private $equipo;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="serviceOrder")
     */
    private $user;

    public function __construct()
    {
        $this->manoObras = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function setTotalHoraTrabajada(int $totalHoraTrabajada): self
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

    public function getDefecto(): ?string
    {
        return $this->defecto;
    }

    public function setDefecto(?string $defecto): self
    {
        $this->defecto = $defecto;

        return $this;
    }

    public function getFT(): ?bool
    {
        return $this->FT;
    }

    public function setFT(?bool $FT): self
    {
        $this->FT = $FT;

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

    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(?Servicio $servicio): self
    {
        $this->servicio = $servicio;

        return $this;
    }

    public function getEquipo(): ?Equipo
    {
        return $this->equipo;
    }

    public function setEquipo(?Equipo $equipo): self
    {
        $this->equipo = $equipo;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
