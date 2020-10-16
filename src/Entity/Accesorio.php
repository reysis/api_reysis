<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\AccesorioRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={"get", "post"},
 *     itemOperations={"get", "put", "delete"},
 *     normalizationContext={"groups"={"accesorio:read"}},
 *     denormalizationContext={"groups"={"accesorio:write"}},
 * )
 * @ORM\Entity(repositoryClass=AccesorioRepository::class)
 */
class Accesorio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @Groups({"accesorio:read","accesorio:write", "tipo_equipo:read"})
     * @ApiProperty(iri="http://schema.org/nombre")
     */
    private $nombre;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\TipoEquipo", mappedBy="accesorio")
     * @Groups({"accesorio:read","accesorio:write"})
     */
    private $tipoEquipos;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\EquipoAccesorio", mappedBy="accesorio")
     *
     */
    private $equipoAccesorios;

    public function __construct()
    {
        $this->tipoEquipos = new ArrayCollection();
        $this->equipoAccesorios = new ArrayCollection();
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

    /**
     * @return Collection|TipoEquipo[]
     */
    public function getTipoEquipos(): Collection
    {
        return $this->tipoEquipos;
    }

    public function addTipoEquipo(TipoEquipo $tipoEquipo): self
    {
        if (!$this->tipoEquipos->contains($tipoEquipo)) {
            $this->tipoEquipos[] = $tipoEquipo;
            $tipoEquipo->addAccesorio($this);
        }

        return $this;
    }

    public function removeTipoEquipo(TipoEquipo $tipoEquipo): self
    {
        if ($this->tipoEquipos->contains($tipoEquipo)) {
            $this->tipoEquipos->removeElement($tipoEquipo);
            $tipoEquipo->removeAccesorio($this);
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
            $equipoAccesorio->setAccesorio($this);
        }

        return $this;
    }

    public function removeEquipoAccesorio(EquipoAccesorio $equipoAccesorio): self
    {
        if ($this->equipoAccesorios->contains($equipoAccesorio)) {
            $this->equipoAccesorios->removeElement($equipoAccesorio);
            // set the owning side to null (unless already changed)
            if ($equipoAccesorio->getAccesorio() === $this) {
                $equipoAccesorio->setAccesorio(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
       return $this->getNombre();
    }
}
