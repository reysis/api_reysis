<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MarcaRepository;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     iri="http://schema.org/Marca",
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"security_post_denormalize"="is_granted('POST', object)",
 *                  "security_post_denormalize_message"="Solo un Administrador puede crear una marca"
 *          }
 *     },
 *     itemOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "put" = {"security"="is_granted('EDIT', object)",
 *                  "security_message"="Solo un Administrador puede editar una marca."},
 *          "delete" = {
 *                  "security"="is_granted('ERASE', object)",
 *                  "security_message"="No puede realizar esta acción a menos que sea administrador."
 *          }
 *      },
 *      attributes={
 *          "pagination_items_per_page"=10,
 *      }
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "nombre":"partial"
 *      }
 * )
 * @ORM\Entity(repositoryClass=MarcaRepository::class)
 */
class Marca
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ApiProperty(iri="http://schema.org/nombre")
     * @ORM\Column(type="string", length=100)
     * @Groups({"marca:read", "admin:write"})
     */
    private $nombre;

    /**
     * @ORM\OneToMany(targetEntity=Equipo::class, mappedBy="marca", orphanRemoval=true)
     */
    private $equipos;

    public function __construct()
    {
        $this->equipos = new ArrayCollection();
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
            $equipo->setMarca($this);
        }

        return $this;
    }

    public function removeEquipo(Equipo $equipo): self
    {
        if ($this->equipos->contains($equipo)) {
            $this->equipos->removeElement($equipo);
            // set the owning side to null (unless already changed)
            if ($equipo->getMarca() === $this) {
                $equipo->setMarca(null);
            }
        }

        return $this;
    }
}
