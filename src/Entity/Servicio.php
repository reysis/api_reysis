<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ServicioRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=ServicioRepository::class)
 */
class Servicio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TipoServicio", inversedBy="servicios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $tipoServicio;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Equipo", inversedBy="servicios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $equipo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contrato", inversedBy="servicios")
     */
    private $contrato;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Persona", inversedBy="serviciosPersona")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $persona;

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
     * @ORM\Column(type="string", length=11)
     */
    private $estado;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Trabajador", inversedBy="serviciosTrabajador")
     */
    private $trabajador;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $defecto;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $FT;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $garantia;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ControlPiezaServicio", mappedBy="servicio")
     */
    private $controlPiezaServicios;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Garantia", mappedBy="servicio")
     */
    private $garantias;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TrasladoServicio", mappedBy="servicio")
     */
    private $trasladoServicios;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $descripcion;

    public function __construct()
    {
        $this->controlPiezaServicios = new ArrayCollection();
        $this->garantias = new ArrayCollection();
        $this->trasladoServicios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTipoServicio(): ?TipoServicio
    {
        return $this->tipoServicio;
    }

    public function setTipoServicio(?TipoServicio $tipoServicio): self
    {
        $this->tipoServicio = $tipoServicio;

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

    public function getContrato(): ?Contrato
    {
        return $this->contrato;
    }

    public function setContrato(?Contrato $contrato): self
    {
        $this->contrato = $contrato;

        return $this;
    }

    public function getPersona(): ?Persona
    {
        return $this->persona;
    }

    public function setPersona(?Persona $persona): self
    {
        $this->persona = $persona;

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

    public function setEstado(?string $estado): self
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

    public function getDefecto(): ?string
    {
        return $this->defecto;
    }

    public function setDefecto(string $defecto): self
    {
        $this->defecto = $defecto;

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

    public function getGarantia(): ?int
    {
        return $this->garantia;
    }

    public function setGarantia(int $garantia): self
    {
        $this->garantia = $garantia;

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
            $controlPiezaServicio->setServicio($this);
        }

        return $this;
    }

    public function removeControlPiezaServicio(ControlPiezaServicio $controlPiezaServicio): self
    {
        if ($this->controlPiezaServicios->contains($controlPiezaServicio)) {
            $this->controlPiezaServicios->removeElement($controlPiezaServicio);
            // set the owning side to null (unless already changed)
            if ($controlPiezaServicio->getServicio() === $this) {
                $controlPiezaServicio->setServicio(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Garantia[]
     */
    public function getGarantias(): Collection
    {
        return $this->garantias;
    }

    public function addGarantia(Garantia $garantia): self
    {
        if (!$this->garantias->contains($garantia)) {
            $this->garantias[] = $garantia;
            $garantia->setServicio($this);
        }

        return $this;
    }

    public function removeGarantia(Garantia $garantia): self
    {
        if ($this->garantias->contains($garantia)) {
            $this->garantias->removeElement($garantia);
            // set the owning side to null (unless already changed)
            if ($garantia->getServicio() === $this) {
                $garantia->setServicio(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TrasladoServicio[]
     */
    public function getTrasladoServicios(): Collection
    {
        return $this->trasladoServicios;
    }

    public function addTrasladoServicio(TrasladoServicio $trasladoServicio): self
    {
        if (!$this->trasladoServicios->contains($trasladoServicio)) {
            $this->trasladoServicios[] = $trasladoServicio;
            $trasladoServicio->setServicio($this);
        }

        return $this;
    }

    public function removeTrasladoServicio(TrasladoServicio $trasladoServicio): self
    {
        if ($this->trasladoServicios->contains($trasladoServicio)) {
            $this->trasladoServicios->removeElement($trasladoServicio);
            // set the owning side to null (unless already changed)
            if ($trasladoServicio->getServicio() === $this) {
                $trasladoServicio->setServicio(null);
            }
        }

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

    public function __toString(): ?string
    {
        return $this->getNoServicio();
    }
}
