<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EquipoServicioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

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
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "servicio":"exact",
 *          "equipo":"exact",
 *      }
 * )
 * @ORM\Entity(repositoryClass=EquipoServicioRepository::class)
 * @UniqueEntity(
 *      fields={"servicio","equipo"},
 *      message="Este servicio ya ha sido asociado a este equipo"
 * )
 */
class EquipoServicio
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"equipo:read", "turnodisponible:read", "equiposervicio:read", "turno:read"})
     * @ORM\ManyToOne(targetEntity=Servicio::class, inversedBy="sePrestaAEquipo")
     * @ORM\JoinColumn(nullable=false)
     */
    private $servicio;

    /**
     * @Groups({"turnodisponible:read", "turno:read"})
     * @ORM\ManyToOne(targetEntity=Equipo::class, inversedBy="reciveServicios")
     * @ORM\JoinColumn(nullable=false)
     */
    private $equipo;

    /**
     * @Groups({"equiposervicio:read"})
     * @ORM\OneToMany(targetEntity=TallerBrindaServicio::class, mappedBy="servicioAEquipo", orphanRemoval=true)
     */
    private $tallerBrindaServicios;

    public function __construct()
    {
        $this->tallerBrindaServicios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(?Servicio $servicio): self
    {
        $this->servicio = $servicio;

        return $this;
    }

    public function getEquipo(): ?Equipo
    {
        return $this->equipo;
    }

    public function setEquipo(?Equipo $equipo): self
    {
        $this->equipo = $equipo;

        return $this;
    }

    /**
     * @return Collection|TallerBrindaServicio[]
     */
    public function getTallerBrindaServicios(): Collection
    {
        return $this->tallerBrindaServicios;
    }

    public function addTallerBrindaServicio(TallerBrindaServicio $tallerBrindaServicio): self
    {
        if (!$this->tallerBrindaServicios->contains($tallerBrindaServicio)) {
            $this->tallerBrindaServicios[] = $tallerBrindaServicio;
            $tallerBrindaServicio->setServicioAEquipo($this);
        }

        return $this;
    }

    public function removeTallerBrindaServicio(TallerBrindaServicio $tallerBrindaServicio): self
    {
        if ($this->tallerBrindaServicios->removeElement($tallerBrindaServicio)) {
            // set the owning side to null (unless already changed)
            if ($tallerBrindaServicio->getServicioAEquipo() === $this) {
                $tallerBrindaServicio->setServicioAEquipo(null);
            }
        }

        return $this;
    }
}
