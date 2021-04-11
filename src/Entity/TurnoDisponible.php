<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TurnoDisponibleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
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
 *          "servicioTaller": "exact"
 *      }
 * )
 * @ApiFilter(
 *      DateFilter::class,
 *      properties={
 *          "date.date"
 *      }
 * )
 * @ORM\Entity(repositoryClass=TurnoDisponibleRepository::class)
 */
class TurnoDisponible
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"turnodisponible:read", "turno:read"})
     * @ORM\ManyToOne(targetEntity=TallerBrindaServicio::class, inversedBy="turnoDisponibles")
     * @ORM\JoinColumn(nullable=false)
     */
    private $servicioTaller;

    /**
     * @Groups({"turnodisponible:read", "turno:read"})
     * @ORM\ManyToOne(targetEntity=AvailableDate::class, inversedBy="turnosDisponibles")
     * @ORM\JoinColumn(nullable=false)
     */
    private $date;

    /**
     * @Groups({"turnodisponible:read", "turno:read"})
     * @ORM\Column(type="integer")
     */
    private $amountAvailable;

    /**
     * @ORM\Column(type="integer")
     */
    private $originalAmount;

    /**
     * @ORM\OneToMany(targetEntity=Turno::class, mappedBy="detalles", orphanRemoval=true)
     */
    private $turno;

    public function __construct()
    {
        $this->turno = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServicioTaller(): ?TallerBrindaServicio
    {
        return $this->servicioTaller;
    }

    public function setServicioTaller(?TallerBrindaServicio $servicioTaller): self
    {
        $this->servicioTaller = $servicioTaller;

        return $this;
    }

    public function getDate(): ?AvailableDate
    {
        return $this->date;
    }

    public function setDate(?AvailableDate $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getAmountAvailable(): ?int
    {
        return $this->amountAvailable;
    }

    public function setAmountAvailable(int $amountAvailable): self
    {
        $this->amountAvailable = $amountAvailable;

        return $this;
    }

    public function getOriginalAmount(): ?int
    {
        return $this->originalAmount;
    }

    public function setOriginalAmount(int $originalAmount): self
    {
        $this->originalAmount = $originalAmount;

        return $this;
    }

    /**
     * @return Collection|Turno[]
     */
    public function getTurno(): Collection
    {
        return $this->turno;
    }

    public function addTurno(Turno $turno): self
    {
        if (!$this->turno->contains($turno)) {
            $this->turno[] = $turno;
            $turno->setDetalles($this);
        }

        return $this;
    }

    public function removeTurno(Turno $turno): self
    {
        if ($this->turno->removeElement($turno)) {
            // set the owning side to null (unless already changed)
            if ($turno->getDetalles() === $this) {
                $turno->setDetalles(null);
            }
        }

        return $this;
    }
}
