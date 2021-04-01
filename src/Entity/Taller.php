<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TallerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=TallerRepository::class)
 */
class Taller
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"equiposervicio:read", "turno:read"})
     * @ORM\Column(type="string", length=255)
     */
    private $nombre;

    /**
     * @Groups({"equiposervicio:read", "turno:read"})
     * @ORM\OneToOne(targetEntity=Address::class, inversedBy="taller", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $address;

    /**
     * @Groups({"equiposervicio:read", "turno:read"})
     * @ORM\Column(type="string", length=255)
     */
    private $alias;

    /**
     * @ORM\OneToMany(targetEntity=TallerBrindaServicio::class, mappedBy="taller", orphanRemoval=true)
     */
    private $brindaServicios;


    public function __construct()
    {
        $this->brindaServicios = new ArrayCollection();
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

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(Address $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }

    public function setAlias(string $alias): self
    {
        $this->alias = $alias;

        return $this;
    }

    /**
     * @return Collection|TallerBrindaServicio[]
     */
    public function getBrindaServicios(): Collection
    {
        return $this->brindaServicios;
    }

    public function addBrindaServicio(TallerBrindaServicio $brindaServicio): self
    {
        if (!$this->brindaServicios->contains($brindaServicio)) {
            $this->brindaServicios[] = $brindaServicio;
            $brindaServicio->setTaller($this);
        }

        return $this;
    }

    public function removeBrindaServicio(TallerBrindaServicio $brindaServicio): self
    {
        if ($this->brindaServicios->removeElement($brindaServicio)) {
            // set the owning side to null (unless already changed)
            if ($brindaServicio->getTaller() === $this) {
                $brindaServicio->setTaller(null);
            }
        }

        return $this;
    }
}
