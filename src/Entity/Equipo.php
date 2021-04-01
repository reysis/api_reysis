<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EquipoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get" = {
 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *          },
 *          "post" = {
 *              "security"="is_granted('ROLE_ADMIN')",
 *          }
 *      },
 *      itemOperations={
 *          "get" = {"security" = "is_granted('ROLE_ADMIN'"},
 *          "put" = {"security" = "is_granted('ROLE_ADMIN')"},
 *          "delete" = {"security" = "is_granted('ROLE_ADMIN')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=EquipoRepository::class)
 * @UniqueEntity(
 *      fields={"nombre"},
 *      message="El nombre del equipo debe ser unico"
 * )
 */
class Equipo
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"equipo:read", "turno:read"})
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $nombre;

    /**
     * @Groups({"equipo:read"})
     * @ORM\OneToMany(targetEntity=EquipoServicio::class, mappedBy="equipo", orphanRemoval=true)
     */
    private $reciveServicios;

    public function __construct()
    {
        $this->reciveServicios = new ArrayCollection();
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
     * @return Collection|EquipoServicio[]
     */
    public function getReciveServicios(): Collection
    {
        return $this->reciveServicios;
    }

    public function addReciveServicio(EquipoServicio $reciveServicio): self
    {
        if (!$this->reciveServicios->contains($reciveServicio)) {
            $this->reciveServicios[] = $reciveServicio;
            $reciveServicio->setEquipo($this);
        }

        return $this;
    }

    public function removeReciveServicio(EquipoServicio $reciveServicio): self
    {
        if ($this->reciveServicios->removeElement($reciveServicio)) {
            // set the owning side to null (unless already changed)
            if ($reciveServicio->getEquipo() === $this) {
                $reciveServicio->setEquipo(null);
            }
        }

        return $this;
    }
}
