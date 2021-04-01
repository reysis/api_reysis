<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TurnoDisponibleRepository;
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
     * @ORM\OneToOne(targetEntity=Turno::class, mappedBy="detalles", cascade={"persist", "remove"})
     */
    private $turno;

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

    public function getTurno(): ?Turno
    {
        return $this->turno;
    }

    public function setTurno(Turno $turno): self
    {
        // set the owning side of the relation if necessary
        if ($turno->getDetalles() !== $this) {
            $turno->setDetalles($this);
        }

        $this->turno = $turno;

        return $this;
    }
}
