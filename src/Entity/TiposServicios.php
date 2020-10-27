<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TiposServiciosRepository;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ApiResource(
 *     iri="http://schema.org/Service",
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"security_post_denormalize"="is_granted('POST', object)",
 *                  "security_post_denormalize_message"="Solo un Administrador puede crear Tipos de Servicios",
 *                  "swagger_context"={
         *                 "consumes"={
         *                     "multipart/form-data",
         *                 },
         *                 "parameters"={
         *                     {
         *                         "in"="formData",
         *                         "name"="image",
         *                         "type"="file",
         *                         "description"="The file to upload",
         *                     },
         *          },
 *             },
 *          }
 *     },
 *     itemOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "put" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 *     attributes={
 *          "pagination_items_per_page" = 10
 *     }
 * )
 * @ORM\Entity(repositoryClass=TiposServiciosRepository::class)
 * @Vich\Uploadable
 */
class TiposServicios
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"tiposservicios:read", "admin:write"})
     */
    private $nombre;

    /**
     * @var string|null una descripción completa del servicio
     * 
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/description")
     * @Groups({"tiposservicios:read", "admin:write"})
     */
    private $descripcion;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     * @Groups({"tiposservicios:read", "admin:write"})
     */
    public $image;

    /**
     * @return MediaObject|null
     */
    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    /**
     * @param MediaObject|null $image
     */
    public function setImage(?MediaObject $image): void
    {
        $this->image = $image;
    }

    /**
     * @ORM\OneToMany(targetEntity=Servicio::class, mappedBy="tipoServicio", orphanRemoval=true)
     */
    private $servicios;

    public function __construct()
    {
        $this->servicios = new ArrayCollection();
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

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * @return Collection|Servicio[]
     */
    public function getServicios(): Collection
    {
        return $this->servicios;
    }

    public function addServicio(Servicio $servicio): self
    {
        if (!$this->servicios->contains($servicio)) {
            $this->servicios[] = $servicio;
            $servicio->setTipoServicio($this);
        }

        return $this;
    }

    public function removeServicio(Servicio $servicio): self
    {
        if ($this->servicios->contains($servicio)) {
            $this->servicios->removeElement($servicio);
            // set the owning side to null (unless already changed)
            if ($servicio->getTipoServicio() === $this) {
                $servicio->setTipoServicio(null);
            }
        }

        return $this;
    }
}
