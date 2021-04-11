<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TallerBrindaServicioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *      collectionOperations={
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
 *          "servicioAEquipo.servicio":"exact",
 *          "servicioAEquipo.equipo":"exact"
 *      }
 * )
 * @ORM\Entity(repositoryClass=TallerBrindaServicioRepository::class)
 * @UniqueEntity(
 *      fields={"servicioAEquipo","taller"},
 *      errorPath="taller",
 *      message="Este taller ya brinda ese servicio a al equipo seleccionado"
 * )
 */
class TallerBrindaServicio
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"equiposervicio:read", "turnodisponible:read", "turno:read", "tallerbrindaservicio:read"})
     * @ORM\ManyToOne(targetEntity=Taller::class, inversedBy="brindaServicios")
     * @ORM\JoinColumn(nullable=false)
     */
    private $taller;

    /**
     * @Groups({"equiposervicio:read"})
     * @ORM\OneToMany(targetEntity=TurnoDisponible::class, mappedBy="servicioTaller", orphanRemoval=true)
     */
    private $turnoDisponibles;

    /**
     * @Groups({"turnodisponible:read", "turno:read", "tallerbrindaservicio:read"})
     * @ORM\ManyToOne(targetEntity=EquipoServicio::class, inversedBy="tallerBrindaServicios")
     * @ORM\JoinColumn(nullable=false)
     */
    private $servicioAEquipo;

    public function __construct()
    {
        $this->turnoDisponibles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getTaller(): ?Taller
    {
        return $this->taller;
    }

    public function setTaller(?Taller $taller): self
    {
        $this->taller = $taller;

        return $this;
    }

    /**
     * @return Collection|TurnoDisponible[]
     */
    public function getTurnoDisponibles(): Collection
    {
        return $this->turnoDisponibles;
    }

    public function addTurnoDisponible(TurnoDisponible $turnoDisponible): self
    {
        if (!$this->turnoDisponibles->contains($turnoDisponible)) {
            $this->turnoDisponibles[] = $turnoDisponible;
            $turnoDisponible->setServicioTaller($this);
        }

        return $this;
    }

    public function removeTurnoDisponible(TurnoDisponible $turnoDisponible): self
    {
        if ($this->turnoDisponibles->removeElement($turnoDisponible)) {
            // set the owning side to null (unless already changed)
            if ($turnoDisponible->getServicioTaller() === $this) {
                $turnoDisponible->setServicioTaller(null);
            }
        }

        return $this;
    }

    public function getServicioAEquipo(): ?EquipoServicio
    {
        return $this->servicioAEquipo;
    }

    public function setServicioAEquipo(?EquipoServicio $servicioAEquipo): self
    {
        $this->servicioAEquipo = $servicioAEquipo;

        return $this;
    }
}
