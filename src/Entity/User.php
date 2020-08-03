<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;

/**
 * A person (alive, dead, undead, or fictional).
 * 
 * @see http://schema.org/Person Documentation on Schema.org
 * 
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *      iri="http://schema.org/Person",
 *      normalizationContext={"groups"={"user:read"}},
 *      denormalizationContext={"groups"={"user:write"}},
 * )
 * @ApiFilter(PropertyFilter::class)
 * @UniqueEntity("username")
 * @UniqueEntity("email")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user:read", "user:write"})
     * @Assert\NotBlank()
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"user:write"})
     * @Assert\NotBlank()
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"user:read", "user:write"})
     * @ApiProperty(iri="http://schema.org/email")
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     * @ApiProperty(iri="http://schema.org/address")
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"user:read", "user:write"})
     * @ApiProperty(iri="http://schema.org/telephone")
     * @Assert\NotBlank()
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=11)
     * @Groups({"user:read", "user:write"})
     */
    private $ci;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     * @ApiProperty(iri="http://schema.org/name")
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Turno::class, mappedBy="personaCitada", cascade={"persist"}, orphanRemoval=true)
     * @Groups({"user:read"})
     * @Assert\Valid()
     */
    private $turnos;

    public function __construct()
    {
        $this->turnos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): self
    {
        $this->telephone = $telephone;

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Turno[]
     */
    public function getTurnos(): Collection
    {
        return $this->turnos;
    }

    public function addTurno(Turno $turno): self
    {
        if (!$this->turnos->contains($turno)) {
            $this->turnos[] = $turno;
            $turno->setPersonaCitada($this);
        }

        return $this;
    }

    public function removeTurno(Turno $turno): self
    {
        if ($this->turnos->contains($turno)) {
            $this->turnos->removeElement($turno);
            // set the owning side to null (unless already changed)
            if ($turno->getPersonaCitada() === $this) {
                $turno->setPersonaCitada(null);
            }
        }

        return $this;
    }
}
