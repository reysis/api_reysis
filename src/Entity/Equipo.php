<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\EntidadRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * Equipo
 * @ORM\InheritanceType("JOINED" )
 * @ORM\DiscriminatorColumn(name="discriminante",type="string")
 * @ORM\DiscriminatorMap({"equipo" = "Equipo", "equipoEstatal" = "EquipoEstatal"})
 * @ORM\Entity(repositoryClass=EquipoRepository::class)
 */
class Equipo
{
    const EQUIPOESTATAL = 'equipoEstatal';
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TipoEquipo", inversedBy="equipos")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $tipoEquipo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $modelo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $numeroSerie;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Servicio", mappedBy="equipo")
     */
    private $servicios;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\EquipoAccesorio", mappedBy="equipo")
     */
    private $equipoAccesorios;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Marca", inversedBy="equipos")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $marca;

    public function __construct()
    {
        $this->servicios = new ArrayCollection();
        $this->equipoAccesorios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
     * @return Collection|EquipoAccesorio[]
     */
    public function getEquipoAccesorios(): Collection
    {
        return $this->equipoAccesorios;
    }

    public function addEquipoAccesorio(EquipoAccesorio $equipoAccesorio): self
    {
        if (!$this->equipoAccesorios->contains($equipoAccesorio)) {
            $this->equipoAccesorios[] = $equipoAccesorio;
            $equipoAccesorio->setEquipo($this);
        }

        return $this;
    }

    public function removeEquipoAccesorio(EquipoAccesorio $equipoAccesorio): self
    {
        if ($this->equipoAccesorios->contains($equipoAccesorio)) {
            $this->equipoAccesorios->removeElement($equipoAccesorio);
            // set the owning side to null (unless already changed)
            if ($equipoAccesorio->getEquipo() === $this) {
                $equipoAccesorio->setEquipo(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
       return $this->getTipoEquipo()." - ".$this->getNumeroSerie();
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
