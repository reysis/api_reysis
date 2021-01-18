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
 *     iri="http://schema.org/Person",
 *     collectionOperations={
 *          "get" = {
 *              "security" = "is_granted('ROLE_ADMIN')"
 *          },
 *          "post" = {
 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *              "validation_groups"={"Default", "create"}
 *          }
 *      },
 *      itemOperations={
 *          "get" = {"security" = "is_granted('PERSONA_GET', object)"},
 *          "put" = {"security" = "is_granted('PERSONA_PUT', object)"},
 *          "delete" = {"security" = "is_granted('PERSONA_ERASE', object)"}
 *      },
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "nombre":"partial",
 *          "ci":"partial",
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
     * @ORM\Column(type="string", length=11)
     * @Groups({"user:read", "user:write", "turno:write","socialmedia:read", "admin:write", "admin:read"})
     * @Assert\NotBlank
     */
    private $ci;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write", "turno:write","socialmedia:read", "admin:write", "admin:read"})
     * @Assert\NotBlank
     */
    private $nombre;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="persona", cascade={"persist", "remove"})
     */
    private $user;

    /**
     * @return mixed
     */
    public function getId()
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        // unset the owning side of the relation if necessary
        if ($user === null && $this->user !== null) {
            $this->user->setPersona(null);
        }

        // set the owning side of the relation if necessary
        if ($user !== null && $user->getPersona() !== $this) {
            $user->setPersona($this);
        }

        $this->user = $user;

        return $this;
    }
}
