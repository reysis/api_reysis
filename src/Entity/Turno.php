<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\TurnoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator as OwnAssert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get"={"security" = "is_granted('ROLE_USER')"},
 *          "post" = {
 *                 "security_post_denormalize"="is_granted('ROLE_USER')",
 *          }
 *      },
 *      itemOperations={
 *          "get" = {"security" = "is_granted('GET_SPECIFIC', object)"},
 *          "put" = {
 *                  "security"="is_granted('EDIT', object)",
 *                  "security_message"="Solamente puede editar sus propios turnos, necesita permisos como administrador para realizar esta acción."
 *          },
 *          "delete"= {
 *                  "security"="is_granted('ERASE', object)",
 *                  "security_message"="No puede realizar esta acción a menos que sea administrador o dueño del turno."
 *          }
 *      },
 *      attributes={
 *          "pagination_items_per_page"=10,
 *      }
 * )
 * @ORM\Entity(repositoryClass=TurnoRepository::class)
 * @ApiFilter(DateFilter::class, properties={"fecha"})
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "user":"exact"
 *      }
 * )
 * @OwnAssert\AvailableDate()
 */
class Turno
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * Una breve descripción del defecto
     * 
     * @ORM\Column(type="string", length=255)
     * @Groups({"turno:read", "turno:write"})
     * @Assert\NotBlank()
     */
    private $defecto;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="turnos", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"turno:read", "turno:write"})
     * @Assert\NotBlank
     * @OwnAssert\IsTurnoOwnerValid()
     */
    private $user;

    /**
     * @Groups({"turno:read", "turno:write"})
     * @ORM\Column(type="boolean")
     */
    private $domicilio = false;

    /**
     * @Groups({"turno:read", "turno:write"})
     * @ORM\OneToOne(targetEntity=TurnoDisponible::class, inversedBy="turno", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $detalles;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDefecto(): ?string
    {
        return $this->defecto;
    }

    public function setDefecto(?string $defecto): self
    {
        $this->defecto = $defecto;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getDomicilio(): ?bool
    {
        return $this->domicilio;
    }

    public function setDomicilio(bool $domicilio): self
    {
        $this->domicilio = $domicilio;

        return $this;
    }

    public function getDetalles(): ?TurnoDisponible
    {
        return $this->detalles;
    }

    public function setDetalles(TurnoDisponible $detalles): self
    {
        $this->detalles = $detalles;

        return $this;
    }
}
