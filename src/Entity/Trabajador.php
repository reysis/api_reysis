<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TrabajadorRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=TrabajadorRepository::class)
 */
class Trabajador extends Persona
{
    protected $discriminante = self::TRABAJADOR;

    /**
     * @ORM\Column(type="integer")
     */
    private $numeroContrato;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fechaInicio;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fechaFin;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Servicio", mappedBy="trabajador")
     */
    private $serviciosTrabajador;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecursoTrabajador", mappedBy="trabajador")
     */
    private $recursoTrabajadors;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Garantia", mappedBy="trabajador")
     */
    private $garantias;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\HistorialTransferencia", mappedBy="trabajador")
     */
    private $historialTrasferencias;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Tarea", mappedBy="trabajador")
     */
    private $tareas;

    /**
     * @ORM\OneToMany(targetEntity=RecursoExtraido::class, mappedBy="provedor", orphanRemoval=true)
     */
    private $recursoExtraidos;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="trabajador", cascade={"persist", "remove"})
     */
    private $user;

    public function __construct()
    {
        parent::__construct();
        $this->serviciosTrabajador = new ArrayCollection();
        $this->recursoTrabajadors = new ArrayCollection();
        $this->garantias = new ArrayCollection();
        $this->historialTrasferencias = new ArrayCollection();
        $this->tareas = new ArrayCollection();
        $this->recursoExtraidos = new ArrayCollection();
    }

    public function getNumeroContrato(): ?int
    {
        return $this->numeroContrato;
    }

    public function setNumeroContrato(int $numeroContrato): self
    {
        $this->numeroContrato = $numeroContrato;

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

    public function getFechaFin(): ?\DateTimeInterface
    {
        return $this->fechaFin;
    }

    public function setFechaFin(\DateTimeInterface $fechaFin): self
    {
        $this->fechaFin = $fechaFin;

        return $this;
    }

    /**
     * @return Collection|Servicio[]
     */
    public function getServiciosTrabajador(): Collection
    {
        return $this->serviciosTrabajador;
    }

    public function addServiciosTrabajador(Servicio $serviciosTrabajador): self
    {
        if (!$this->serviciosTrabajador->contains($serviciosTrabajador)) {
            $this->serviciosTrabajador[] = $serviciosTrabajador;
            $serviciosTrabajador->setTrabajador($this);
        }

        return $this;
    }

    public function removeServiciosTrabajador(Servicio $serviciosTrabajador): self
    {
        if ($this->serviciosTrabajador->contains($serviciosTrabajador)) {
            $this->serviciosTrabajador->removeElement($serviciosTrabajador);
            // set the owning side to null (unless already changed)
            if ($serviciosTrabajador->getTrabajador() === $this) {
                $serviciosTrabajador->setTrabajador(null);
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
            $recursoTrabajador->setTrabajador($this);
        }

        return $this;
    }

    public function removeRecursoTrabajador(RecursoTrabajador $recursoTrabajador): self
    {
        if ($this->recursoTrabajadors->contains($recursoTrabajador)) {
            $this->recursoTrabajadors->removeElement($recursoTrabajador);
            // set the owning side to null (unless already changed)
            if ($recursoTrabajador->getTrabajador() === $this) {
                $recursoTrabajador->setTrabajador(null);
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
            $garantia->setTrabajador($this);
        }

        return $this;
    }

    public function removeGarantia(Garantia $garantia): self
    {
        if ($this->garantias->contains($garantia)) {
            $this->garantias->removeElement($garantia);
            // set the owning side to null (unless already changed)
            if ($garantia->getTrabajador() === $this) {
                $garantia->setTrabajador(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
       return $this->getNombre().' '.$this->getApellidos();
    }

    /**
     * @return Collection|HistorialTransferencia[]
     */
    public function getHistorialTrasferencias(): Collection
    {
        return $this->historialTrasferencias;
    }

    public function addHistorialTrasferencia(HistorialTransferencia $historialTrasferencia): self
    {
        if (!$this->historialTrasferencias->contains($historialTrasferencia)) {
            $this->historialTrasferencias[] = $historialTrasferencia;
            $historialTrasferencia->setTrabajador($this);
        }

        return $this;
    }

    public function removeHistorialTrasferencia(HistorialTransferencia $historialTrasferencia): self
    {
        if ($this->historialTrasferencias->contains($historialTrasferencia)) {
            $this->historialTrasferencias->removeElement($historialTrasferencia);
            // set the owning side to null (unless already changed)
            if ($historialTrasferencia->getTrabajador() === $this) {
                $historialTrasferencia->setTrabajador(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Tarea[]
     */
    public function getTareas(): Collection
    {
        return $this->tareas;
    }

    public function addTarea(Tarea $tarea): self
    {
        if (!$this->tareas->contains($tarea)) {
            $this->tareas[] = $tarea;
            $tarea->setTrabajador($this);
        }

        return $this;
    }

    public function removeTarea(Tarea $tarea): self
    {
        if ($this->tareas->contains($tarea)) {
            $this->tareas->removeElement($tarea);
            // set the owning side to null (unless already changed)
            if ($tarea->getTrabajador() === $this) {
                $tarea->setTrabajador(null);
            }
        }

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
            $recursoExtraido->setProvedor($this);
        }

        return $this;
    }

    public function removeRecursoExtraido(RecursoExtraido $recursoExtraido): self
    {
        if ($this->recursoExtraidos->contains($recursoExtraido)) {
            $this->recursoExtraidos->removeElement($recursoExtraido);
            // set the owning side to null (unless already changed)
            if ($recursoExtraido->getProvedor() === $this) {
                $recursoExtraido->setProvedor(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        // set the owning side of the relation if necessary
        if ($user->getTrabajador() !== $this) {
            $user->setTrabajador($this);
        }

        return $this;
    }

}
