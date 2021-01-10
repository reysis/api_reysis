<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\DTO\MediaObject\MediaObjectInput;
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
 *     },
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
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Groups({"servicio:read", "admin:write"})
     * @Assert\NotBlank
     */
    private $nombre;

    /**
     * @var string una descripción completa del servicio
     * 
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/description")
     * @Groups({"servicio:item:get", "admin:write"})
     * @Assert\NotBlank
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
     * @ApiProperty(
     *     readableLink=true,
     *     writableLink=true
     * )
     *
     * @Groups({"admin:write", "servicio:read"})
     * @ORM\OneToMany(targetEntity=MediaObject::class, mappedBy="servicio", cascade={"persist", "remove"})
     * @Assert\NotBlank
     */
    private $serviceImages;

    public function __construct()
    {
        $this->serviceImages = new ArrayCollection();
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

    public function getDescripcion(): string
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
}
