<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TipoEquipoRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={"get", "post"},
 *     itemOperations={"get", "put", "delete"},
 *     normalizationContext={"groups"={"tipo_equipo:read"}},
 *     denormalizationContext={"groups"={"tipo_equipo:write"}},
 * )
 * @ORM\Entity(repositoryClass=TipoEquipoRepository::class)
 */
class TipoEquipo
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @Groups({"tipo_equipo:read","tipo_equipo:write", "accesorio:read"})
     * @ApiProperty(iri="http://schema.org/nombre")
     */
    private $nombre;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Equipo", mappedBy="tipoEquipo")
     *
     */
    private $equipos;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Accesorio", inversedBy="tipoEquipos")
     * @Groups({"tipo_equipo:read","tipo_equipo:write"})
     */
    private $accesorio;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Turno", mappedBy="tipoEquipo")
     */
    private $turnos;

    public function __construct()
    {
        $this->equipos = new ArrayCollection();
        $this->agendas = new ArrayCollection();
        $this->accesorio = new ArrayCollection();
        $this->turnos = new ArrayCollection();
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
     * @return Collection|Equipo[]
     */
    public function getEquipos(): Collection
    {
        return $this->equipos;
    }

    public function addEquipo(Equipo $equipo): self
    {
        if (!$this->equipos->contains($equipo)) {
            $this->equipos[] = $equipo;
            $equipo->setTipoEquipo($this);
        }

        return $this;
    }

    public function removeEquipo(Equipo $equipo): self
    {
        if ($this->equipos->contains($equipo)) {
            $this->equipos->removeElement($equipo);
            // set the owning side to null (unless already changed)
            if ($equipo->getTipoEquipo() === $this) {
                $equipo->setTipoEquipo(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Accesorio[]
     */
    public function getAccesorio(): Collection
    {
        return $this->accesorio;
    }

    public function addAccesorio(Accesorio $accesorio): self
    {
        if (!$this->accesorio->contains($accesorio)) {
            $this->accesorio[] = $accesorio;
        }

        return $this;
    }

    public function removeAccesorio(Accesorio $accesorio): self
    {
        if ($this->accesorio->contains($accesorio)) {
            $this->accesorio->removeElement($accesorio);
        }

        return $this;
    }

    public function __toString(): ?string
    {
        return $this->getNombre();
    }

    /**
     * @return Collection|Turno[]
     */
    public function getTurnos(): Collection
    {
        return $this->turnos;
    }

    public function addTurno(Turno $turno): self
    {
        if (!$this->turnos->contains($turno)) {
            $this->turnos[] = $turno;
            $turno->setTipoEquipo($this);
        }

        return $this;
    }

    public function removeTurno(Turno $turno): self
    {
        if ($this->turnos->contains($turno)) {
            $this->turnos->removeElement($turno);
            // set the owning side to null (unless already changed)
            if ($turno->getTipoEquipo() === $this) {
                $turno->setTipoEquipo(null);
            }
        }

        return $this;
    }
}
