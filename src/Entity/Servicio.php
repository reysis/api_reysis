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

/**
 * @ApiResource(
 *     iri="http://schema.org/Service",
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"security_post_denormalize"="is_granted('POST', object)",
 *                  "security_post_denormalize_message"="Solo un Administrador puede crear Tipos de Servicios"
 *          }
 *     },
 *     itemOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "put" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=TiposServiciosRepository::class)
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
     * @Groups({"servicio:read", "admin:read", "admin:write"})
     */
    private $nombre;

    /**
     * @var string|null una descripción completa del servicio
     * 
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/description")
     * @Groups({"servicio:read", "admin:read","admin:write"})
     */
    private $descripcion;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     * @Groups({"servicio:read", "admin:read", "admin:write"})
     */
    public $image;
    /**
     * @ORM\OneToMany(targetEntity=OrdenServicio::class, mappedBy="servicio", orphanRemoval=true)
     * @Groups({"admin:read", "admin:write"})
     */
    private $servicioPrestado;

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
     * @Groups({"tiposservicios:read"})
     */
    public function getShortDescription(): ?string
    {
        if(strlen($this->descripcion) < 70){
            return $this->descripcion;
        }
        return substr($this->descripcion, 0, 70).'...';
    }
}
