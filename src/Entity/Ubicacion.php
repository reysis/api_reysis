<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UbicacionRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=UbicacionRepository::class)
 */
class Ubicacion
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
    private $nombre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $direccion;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $telefonoFijo;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $telefonoCell;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Traslado", mappedBy="ubicacion")
     */
    private $traslados;

    public function __construct()
    {
        $this->traslados = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(string $direccion): self
    {
        $this->direccion = $direccion;

        return $this;
    }

    public function getTelefonoFijo(): ?int
    {
        return $this->telefonoFijo;
    }

    public function setTelefonoFijo(?int $telefonoFijo): self
    {
        $this->telefonoFijo = $telefonoFijo;

        return $this;
    }

    public function getTelefonoCell(): ?int
    {
        return $this->telefonoCell;
    }

    public function setTelefonoCell(?int $telefonoCell): self
    {
        $this->telefonoCell = $telefonoCell;

        return $this;
    }

    /**
     * @return Collection|Traslado[]
     */
    public function getTraslados(): Collection
    {
        return $this->traslados;
    }

    public function addTraslado(Traslado $traslado): self
    {
        if (!$this->traslados->contains($traslado)) {
            $this->traslados[] = $traslado;
            $traslado->setUbicacion($this);
        }

        return $this;
    }

    public function removeTraslado(Traslado $traslado): self
    {
        if ($this->traslados->contains($traslado)) {
            $this->traslados->removeElement($traslado);
            // set the owning side to null (unless already changed)
            if ($traslado->getUbicacion() === $this) {
                $traslado->setUbicacion(null);
            }
        }

        return $this;
    }
}
