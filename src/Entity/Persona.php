<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\PersonaRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
/**
 * @ORM\Entity(repositoryClass=PersonaRepository::class)
 * @ApiResource(
 *      iri="http://schema.org/Person",
 *      normalizationContext={"groups"={"persona:read"}},
 *      denormalizationContext={"groups"={"persona:write"}},
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "nombre":"partial",
 *          "ci":"partial",
 *          "address":"partial",
 *          "email":"partial",
 *          "telephone":"partial",
 *          "username":"exact"
 *      }
 * )
 */
class Persona
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read","persona:read", "persona:write"})
     * @Assert\NotBlank()
     */
    private $nombre;

    /**
     * @ORM\Column(type="string", length=11)
     * @Groups({"user:read","persona:read", "persona:write"})
     * @Assert\NotBlank()
     */
    private $ci;


    /**
     * Usuario linkeado a esta persona (iri)
     * 
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="persona", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"persona:read", "persona:write"})
     */
    private $username;

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

    public function getCi(): ?string
    {
        return $this->ci;
    }

    public function setCi(string $ci): self
    {
        $this->ci = $ci;

        return $this;
    }

    public function getUsername(): ?User
    {
        return $this->username;
    }

    public function setUsername(User $username): self
    {
        $this->username = $username;

        return $this;
    }
}
