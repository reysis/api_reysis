<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\TurnoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get" = {
 *                  "security"="is_granted('ROLE_ADMIN')",
 *                  "security_message"="Solo un administrador puede acceder a este recurso.",
 *          },
 *          "post" = {"security_post_denormalize"="is_granted('POST', object)", 
 *                  "security_post_denormalize_message"="Solo el propio usuario o un Administrador puede crear turnos para este usuario"
 *          }
 *      },
 *      itemOperations={
 *          "get" = {
 *                  "security"="is_granted('GET_SPECIFIC', object)",
 *                  "security_message"="Usted solo tiene acceso a sus propios Turnos."
 *          },
 *          "put" = {
 *                  "security"="is_granted('EDIT', object)",
 *                  "security_message"="Solamente puede editar sus propios turnos, necesita permisos como administrador para realizar esta acción."
 *          },
 *          "delete" = {
 *                  "security"="is_granted('ERASE', object)",
 *                  "security_message"="No puede realizar esta acción a menos que sea administrador."
 *          }
 *      },
 *      normalizationContext={"groups"={"turno:read"}},
 *      denormalizationContext={"groups"={"turno:write"}},
 *      attributes={
 *          "pagination_items_per_page"=10,
 *      }
 * )
 * @ORM\Entity(repositoryClass=TurnoRepository::class)
 * @ApiFilter(DateFilter::class, properties={"fecha"})
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
     * @ORM\Column(type="datetime")
     * @Groups({"turno:read", "turno:write", "user:read"})
     * @Assert\NotBlank()
     */
    private $fecha;

    /**
     * Una breve descripción del defecto
     * 
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"turno:read", "turno:write", "user:read"})
     * @Assert\NotBlank()
     */
    private $defecto;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="turnos")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"turno:read", "turno:write"})
     * @Assert\NotBlank()
     */
    private $personaCitada;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
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

    public function getPersonaCitada(): ?User
    {
        return $this->personaCitada;
    }

    public function setPersonaCitada(?User $personaCitada): self
    {
        $this->personaCitada = $personaCitada;

        return $this;
    }
}
