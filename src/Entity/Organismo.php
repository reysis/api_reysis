<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrganismoRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=OrganismoRepository::class)
 */
class Organismo
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
     * @ORM\OneToMany(targetEntity="App\Entity\Entidad", mappedBy="organismo")
     */
    private $entidads;

    public function __construct()
    {
        $this->entidads = new ArrayCollection();
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
     * @return Collection|Entidad[]
     */
    public function getEntidads(): Collection
    {
        return $this->entidads;
    }

    public function addEntidad(Entidad $entidad): self
    {
        if (!$this->entidads->contains($entidad)) {
            $this->entidads[] = $entidad;
            $entidad->setOrganismo($this);
        }

        return $this;
    }

    public function removeEntidad(Entidad $entidad): self
    {
        if ($this->entidads->contains($entidad)) {
            $this->entidads->removeElement($entidad);
            // set the owning side to null (unless already changed)
            if ($entidad->getOrganismo() === $this) {
                $entidad->setOrganismo(null);
            }
        }

        return $this;
    }
}
