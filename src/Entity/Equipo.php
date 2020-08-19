<?php

namespace App\Entity;

use App\Repository\EquipoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=EquipoRepository::class)
 */
class Equipo
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $modelo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $numeroSerie;

    /**
     * @ORM\ManyToOne(targetEntity=TipoEquipo::class, inversedBy="equipos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tipoEquipo;

    /**
     * @ORM\OneToMany(targetEntity=Servicio::class, mappedBy="equipo")
     */
    private $servicios;

    /**
     * @ORM\OneToMany(targetEntity=Accesorios::class, mappedBy="equipo")
     */
    private $accesorios;

    /**
     * @ORM\ManyToOne(targetEntity=Marca::class, inversedBy="equipos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $marca;

    public function __construct()
    {
        $this->servicios = new ArrayCollection();
        $this->accesorios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModelo(): ?string
    {
        return $this->modelo;
    }

    public function setModelo(string $modelo): self
    {
        $this->modelo = $modelo;

        return $this;
    }

    public function getNumeroSerie(): ?string
    {
        return $this->numeroSerie;
    }

    public function setNumeroSerie(string $numeroSerie): self
    {
        $this->numeroSerie = $numeroSerie;

        return $this;
    }

    public function getTipoEquipo(): ?TipoEquipo
    {
        return $this->tipoEquipo;
    }

    public function setTipoEquipo(?TipoEquipo $tipoEquipo): self
    {
        $this->tipoEquipo = $tipoEquipo;

        return $this;
    }

    /**
     * @return Collection|Servicio[]
     */
    public function getServicios(): Collection
    {
        return $this->servicios;
    }

    public function addServicio(Servicio $servicio): self
    {
        if (!$this->servicios->contains($servicio)) {
            $this->servicios[] = $servicio;
            $servicio->setEquipo($this);
        }

        return $this;
    }

    public function removeServicio(Servicio $servicio): self
    {
        if ($this->servicios->contains($servicio)) {
            $this->servicios->removeElement($servicio);
            // set the owning side to null (unless already changed)
            if ($servicio->getEquipo() === $this) {
                $servicio->setEquipo(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Accesorios[]
     */
    public function getAccesorios(): Collection
    {
        return $this->accesorios;
    }

    public function addAccesorio(Accesorios $accesorio): self
    {
        if (!$this->accesorios->contains($accesorio)) {
            $this->accesorios[] = $accesorio;
            $accesorio->setEquipo($this);
        }

        return $this;
    }

    public function removeAccesorio(Accesorios $accesorio): self
    {
        if ($this->accesorios->contains($accesorio)) {
            $this->accesorios->removeElement($accesorio);
            // set the owning side to null (unless already changed)
            if ($accesorio->getEquipo() === $this) {
                $accesorio->setEquipo(null);
            }
        }

        return $this;
    }

    public function getMarca(): ?Marca
    {
        return $this->marca;
    }

    public function setMarca(?Marca $marca): self
    {
        $this->marca = $marca;

        return $this;
    }
}
