<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AvailableDateRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get",
 *          "post" = {
 *                  "security_post_denormalize"="is_granted('ROLE_ADMIN')",
 *                  "security_post_denormalize_message"="Solo un Administrador puede crear Tipos de Servicios",
 *          }
 *     },
 *     itemOperations={
 *          "get" = {"security" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "put" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 *     attributes={
 *          "pagination_items_per_page" = 30
 *     }
 * )
 * @ORM\Entity(repositoryClass=AvailableDateRepository::class)
 */
class AvailableDate
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=TurnoDisponible::class, mappedBy="availableDate", orphanRemoval=true)
     */
    private $turnosDisponibles;

    /**
     * @Groups({"turnodisponible:read", "availabledate:write", "availabledate:read", "turno:read"})
     * @ORM\Column(type="integer")
     */
    private $dia;

    /**
     * @Groups({"turnodisponible:read", "availabledate:write", "availabledate:read", "turno:read"})
     * @ORM\Column(type="integer")
     */
    private $mes;

    /**
     * @Groups({"turnodisponible:read", "availabledate:write", "availabledate:read", "turno:read"})
     * @ORM\Column(type="integer")
     */
    private $year;

    /**
     * @Groups({"turnodisponible:read", "availabledate:write", "availabledate:read", "turno:read"})
     * @ORM\Column(type="integer")
     */
    private $hora;

    /**
     * @Groups({"turnodisponible:read", "availabledate:write", "availabledate:read", "turno:read"})
     * @ORM\Column(type="integer")
     */
    private $minutos;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @Groups({"turnodisponible:read", "availabledate:write", "availabledate:read", "turno:read"})
     * @ORM\Column(type="string", length=255)
     */
    private $amPm;

    public function __construct()
    {
        $this->turnosDisponibles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    /**
     * @return Collection|TurnoDisponible[]
     */
    public function getTurnosDisponibles(): Collection
    {
        return $this->turnosDisponibles;
    }

    public function addTurnosDisponible(TurnoDisponible $turnosDisponible): self
    {
        if (!$this->turnosDisponibles->contains($turnosDisponible)) {
            $this->turnosDisponibles[] = $turnosDisponible;
            $turnosDisponible->setAvailableDate($this);
        }

        return $this;
    }

    public function removeTurnosDisponible(TurnoDisponible $turnosDisponible): self
    {
        if ($this->turnosDisponibles->removeElement($turnosDisponible)) {
            // set the owning side to null (unless already changed)
            if ($turnosDisponible->getAvailableDate() === $this) {
                $turnosDisponible->setAvailableDate(null);
            }
        }

        return $this;
    }

    public function getDia(): ?int
    {
        return $this->dia;
    }

    public function setDia(int $dia): self
    {
        $this->dia = $dia;

        return $this;
    }

    public function getMes(): ?int
    {
        return $this->mes;
    }

    public function setMes(int $mes): self
    {
        $this->mes = $mes;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getHora(): ?int
    {
        return $this->hora;
    }

    public function setHora(int $hora): self
    {
        $this->hora = $hora;

        return $this;
    }

    public function getMinutos(): ?int
    {
        return $this->minutos;
    }

    public function setMinutos(int $minutos): self
    {
        $this->minutos = $minutos;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getAmPm(): ?string
    {
        return $this->amPm;
    }

    public function setAmPm(string $amPm): self
    {
        $this->amPm = $amPm;

        return $this;
    }
}
