<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ServicioRepository;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Table;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     iri="http://schema.org/Service",
 *     collectionOperations={
 *          "get",
 *          "post" = {"security"="is_granted('ROLE_ADMIN')"},
 *     },
 *     itemOperations={
 *          "get",
 *          "put" = {"security" = "is_granted('ROLE_ADMIN')"},
 *          "delete" ={"security" = "is_granted('ROLE_ADMIN')"}
 *      },
 *     attributes={
 *          "pagination_items_per_page" = 12
 *     }
 * )
 * @ORM\Entity(repositoryClass=ServicioRepository::class)
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "nombre":"partial",
 *          "description":"partial",
 *          "sePrestaAEquipo.equipo.nombre":"exact"
 *      }
 * )
 * @UniqueEntity(
 *     fields={"nombre"}
 * )
 */
class Servicio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"servicio:read", "equipo:read", "equiposervicio:read", "turno:read"})
     * @Assert\NotBlank
     */
    private $nombre;

    /**
     * @var string una descripción completa del servicio
     * 
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/description")
     * @Groups({"servicio:read", "admin:write"})
     */
    private $description;

    /**
     * Ultia fecha en la que se actualizó la imagen
     *
     * @ORM\Column(type="datetime")
     */
    private $updatedAt;

    /**
     * @Groups({"servicio:read", "admin:write"})
     * @ORM\OneToMany(targetEntity=MediaObject::class, mappedBy="servicio", orphanRemoval=true)
     */
    private $serviceImages;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"servicio:read", "admin:write"})
     */
    private $shortDescription;

    /**
     * @Groups({"servicio:read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $urlPortada;

    /**
     * @Groups({"servicio:read"})
     * @ORM\Column(type="boolean")
     */
    private $published = false;

    /**
     * @Groups({"servicio:read"})
     * @ORM\OneToMany(targetEntity=EquipoServicio::class, mappedBy="servicio", orphanRemoval=true)
     */
    private $sePrestaAEquipo;

    public function __construct()
    {
        $this->serviceImages = new ArrayCollection();
        $this->esPrestadoEn = new ArrayCollection();
        $this->sePrestaAEquipo = new ArrayCollection();
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|MediaObject[]
     */
    public function getServiceImages(): Collection
    {
        return $this->serviceImages;
    }

    public function addServiceImage(MediaObject $serviceImage): self
    {
        if (!$this->serviceImages->contains($serviceImage)) {
            $this->serviceImages[] = $serviceImage;
            $serviceImage->setServicio($this);
        }

        return $this;
    }

    public function removeServiceImage(MediaObject $serviceImage): self
    {
        if ($this->serviceImages->removeElement($serviceImage)) {
            // set the owning side to null (unless already changed)
            if ($serviceImage->getServicio() === $this) {
                $serviceImage->setServicio(null);
            }
        }

        return $this;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function setShortDescription(?string $shortDescription): self
    {
        $this->shortDescription = $shortDescription;

        return $this;
    }

    public function getUrlPortada(): ?string
    {
        return $this->urlPortada;
    }

    public function setUrlPortada(?string $urlPortada): self
    {
        $this->urlPortada = $urlPortada;

        return $this;
    }

    public function getPublished(): ?bool
    {
        return $this->published;
    }

    public function setPublished(bool $published): self
    {
        $this->published = $published;

        return $this;
    }

    /**
     * @return Collection|EquipoServicio[]
     */
    public function getSePrestaAEquipo(): Collection
    {
        return $this->sePrestaAEquipo;
    }

    public function addSePrestaAEquipo(EquipoServicio $sePrestaAEquipo): self
    {
        if (!$this->sePrestaAEquipo->contains($sePrestaAEquipo)) {
            $this->sePrestaAEquipo[] = $sePrestaAEquipo;
            $sePrestaAEquipo->setServicio($this);
        }

        return $this;
    }

    public function removeSePrestaAEquipo(EquipoServicio $sePrestaAEquipo): self
    {
        if ($this->sePrestaAEquipo->removeElement($sePrestaAEquipo)) {
            // set the owning side to null (unless already changed)
            if ($sePrestaAEquipo->getServicio() === $this) {
                $sePrestaAEquipo->setServicio(null);
            }
        }

        return $this;
    }
}
