<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ServicioRepository;
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
 *          "post" = {
 *                  "security_post_denormalize"="is_granted('POST', object)",
 *                  "security_post_denormalize_message"="Solo un Administrador puede crear Tipos de Servicios",
 *                  "swagger_context"={
 *                      "consumes"={
 *                          "multipart/form-data",
 *                      },
 *                      "parameters"={
 *                      {
 *                         "in"="formData",
 *                         "name"="image",
 *                         "type"="file",
 *                         "description"="The file to upload",
 *                     },
 *                 },
 *                 "openapi_context"={
 *                      "requestBody"={
 *                          "content"={
 *                              "multipart/form-data"={
 *                                  "schema"={
 *                                      "type"="object",
 *                                      "properties"={
 *                                          "image"={
 *                                              "type"="string",
 *                                              "format"="binary"
 *                                          }
 *                                      }
 *                                  }
 *                              }
 *                          }
 *                      }
 *                  },
 *             },
 *          }
 *     },
 *     itemOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "put" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=ServicioRepository::class)
 * @Vich\Uploadable
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
     * @ORM\Column(type="string", length=255)
     * @Groups({"servicio:read", "servicio:read", "servicio:write"})
     */
    private $nombre;

    /**
     * @var string|null una descripción completa del servicio
     * 
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/description")
     * @Groups({"servicio:item:get","servicio:write"})
     */
    private $descripcion;

    /**
     * @ORM\OneToMany(targetEntity=OrdenServicio::class, mappedBy="servicio", orphanRemoval=true)
     * @Groups({"admin:read", "admin:write"})
     */
    private $servicioPrestado;

    /**
     * Ultia fecha en la que se actualizó la imagen
     *
     * @ORM\Column(type="datetime")
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=MediaObject::class, mappedBy="servicio", orphanRemoval=true, cascade={"persist", "remove"})
     * @Groups({"servicio:read", "admin:write"})
     */
    private $image;

    public function __construct()
    {
        $this->servicios = new ArrayCollection();
        $this->image = new ArrayCollection();
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
     * @return Collection|OrdenServicio[]
     */
    public function getServicioPrestado(): Collection
    {
        return $this->servicioPrestado;
    }

    public function addServicioPrestado(OrdenServicio $servicio): self
    {
        if (!$this->servicioPrestado->contains($servicio)) {
            $this->servicioPrestado[] = $servicio;
            $servicio->setTipoServicio($this);
        }

        return $this;
    }

    public function removeServicioPrestado(OrdenServicio $servicio): self
    {
        if ($this->servicioPrestado->contains($servicio)) {
            $this->servicioPrestado->removeElement($servicio);
            // set the owning side to null (unless already changed)
            if ($servicio->getTipoServicio() === $this) {
                $servicio->setTipoServicio(null);
            }
        }

        return $this;
    }


    /**
     * @Groups({"servicio:read"})
     */
    public function getShortDescription(): ?string
    {
        if(strlen($this->descripcion) < 70){
            return $this->descripcion;
        }
        return substr($this->descripcion, 0, 70).'...';
    }

    /**
     * @return Collection|MediaObject[]
     */
    public function getImage(): Collection
    {
        return $this->image;
    }

    public function addImage(MediaObject $image): self
    {
        if (!$this->image->contains($image)) {
            $this->image[] = $image;
            $image->setServicio($this);
        }

        return $this;
    }

    public function removeImage(MediaObject $image): self
    {
        if ($this->image->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getServicio() === $this) {
                $image->setServicio(null);
            }
        }

        return $this;
    }
}
