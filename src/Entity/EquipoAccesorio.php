<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\EquipoAccesorioRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=EquipoAccesorioRepository::class)
 */
class EquipoAccesorio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Equipo", inversedBy="equipoAccesorios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $equipo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Accesorio", inversedBy="equipoAccesorios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $accesorio;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $numeroSerie;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fecha;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $garantia;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getAccesorio(): ?Accesorio
    {
        return $this->accesorio;
    }

    public function setAccesorio(?Accesorio $accesorio): self
    {
        $this->accesorio = $accesorio;

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

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getGarantia(): ?bool
    {
        return $this->garantia;
    }

    public function setGarantia(?bool $garantia): self
    {
        $this->garantia = $garantia;

        return $this;
    }
}
