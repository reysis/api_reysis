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
 * @ORM\Entity(repositoryClass=EntidadRepository::class)
 */
class Entidad
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Organismo", inversedBy="entidads")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $organismo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $telefono;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $codigoREEUP;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $NIT;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $numeroIncRegCom;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Persona", inversedBy="entidads")
     * @ORM\JoinTable(name="persona_autorizada",
     * joinColumns={
     *     @ORM\JoinColumn(name="entidad_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="persona_id", referencedColumnName="id")
     *   }
     * )
     */
    private $personaAutorizada;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\DatoBancario", mappedBy="entidad")
     */
    private $datoBancarios;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FichaCliente", mappedBy="entidad")
     */
    private $fichaClientes;

    public function __construct()
    {
        $this->personaAutorizada = new ArrayCollection();
        $this->datoBancarios = new ArrayCollection();
        $this->fichaClientes = new ArrayCollection();
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

    public function getOrganismo(): ?Organismo
    {
        return $this->organismo;
    }

    public function setOrganismo(?Organismo $organismo): self
    {
        $this->organismo = $organismo;

        return $this;
    }

    public function getTelefono(): ?string
    {
        return $this->telefono;
    }

    public function setTelefono(string $telefono): self
    {
        $this->telefono = $telefono;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCodigoREEUP(): ?string
    {
        return $this->codigoREEUP;
    }

    public function setCodigoREEUP(?string $codigoREEUP): self
    {
        $this->codigoREEUP = $codigoREEUP;

        return $this;
    }

    public function getNIT(): ?string
    {
        return $this->NIT;
    }

    public function setNIT(string $NIT): self
    {
        $this->NIT = $NIT;

        return $this;
    }

    public function getNumeroIncRegCom(): ?int
    {
        return $this->numeroIncRegCom;
    }

    public function setNumeroIncRegCom(?int $numeroIncRegCom): self
    {
        $this->numeroIncRegCom = $numeroIncRegCom;

        return $this;
    }

    /**
     * @return Collection|Persona[]
     */
    public function getPersonaAutorizada(): Collection
    {
        return $this->personaAutorizada;
    }

    public function addPersonaAutorizada(Persona $personaAutorizada): self
    {
        if (!$this->personaAutorizada->contains($personaAutorizada)) {
            $this->personaAutorizada[] = $personaAutorizada;
        }

        return $this;
    }

    public function removePersonaAutorizada(Persona $personaAutorizada): self
    {
        if ($this->personaAutorizada->contains($personaAutorizada)) {
            $this->personaAutorizada->removeElement($personaAutorizada);
        }

        return $this;
    }

    /**
     * @return Collection|DatoBancario[]
     */
    public function getDatoBancarios(): Collection
    {
        return $this->datoBancarios;
    }

    public function addDatoBancario(DatoBancario $datoBancario): self
    {
        if (!$this->datoBancarios->contains($datoBancario)) {
            $this->datoBancarios[] = $datoBancario;
            $datoBancario->setEntidad($this);
        }

        return $this;
    }

    public function removeDatoBancario(DatoBancario $datoBancario): self
    {
        if ($this->datoBancarios->contains($datoBancario)) {
            $this->datoBancarios->removeElement($datoBancario);
            // set the owning side to null (unless already changed)
            if ($datoBancario->getEntidad() === $this) {
                $datoBancario->setEntidad(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|FichaCliente[]
     */
    public function getFichaClientes(): Collection
    {
        return $this->fichaClientes;
    }

    public function addFichaCliente(FichaCliente $fichaCliente): self
    {
        if (!$this->fichaClientes->contains($fichaCliente)) {
            $this->fichaClientes[] = $fichaCliente;
            $fichaCliente->setEntidad($this);
        }

        return $this;
    }

    public function removeFichaCliente(FichaCliente $fichaCliente): self
    {
        if ($this->fichaClientes->contains($fichaCliente)) {
            $this->fichaClientes->removeElement($fichaCliente);
            // set the owning side to null (unless already changed)
            if ($fichaCliente->getEntidad() === $this) {
                $fichaCliente->setEntidad(null);
            }
        }

        return $this;
    }
}
