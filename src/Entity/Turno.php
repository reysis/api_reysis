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
 *          "get",
 *          "post" = {"security"="is_granted('ROLE_USER')"}
 *      },
 *      itemOperations={
 *          "get",
 *          "put" = {"security"="is_granted('ROLE_USER')"},
 *          "delete" = {"security"="is_granted('ROLE_ADMIN')"}
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
