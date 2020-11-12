<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AddressRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=AddressRepository::class)
 */
class Address
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"turno:write", "admin:read", "admin:write"})
     */
    private $street;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"turno:write", "admin:read", "admin:write"})
     */
    private $number;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups({"turno:write", "admin:read", "admin:write"})
     */
    private $street_e1;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups({"turno:write", "admin:read", "admin:write"})
     */
    private $street_e2;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"turno:write", "admin:read", "admin:write"})
     */
    private $rpto;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"turno:write", "admin:read", "admin:write"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"turno:write", "admin:read", "admin:write"})
     */
    private $country;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="address", orphanRemoval=true)
     */
    private $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getStreetE1(): ?string
    {
        return $this->street_e1;
    }

    public function setStreetE1(?string $street_e1): self
    {
        $this->street_e1 = $street_e1;

        return $this;
    }

    public function getStreetE2(): ?string
    {
        return $this->street_e2;
    }

    public function setStreetE2(?string $street_e2): self
    {
        $this->street_e2 = $street_e2;

        return $this;
    }

    public function getRpto(): ?string
    {
        return $this->rpto;
    }

    public function setRpto(string $rpto): self
    {
        $this->rpto = $rpto;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setAddress($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getAddress() === $this) {
                $user->setAddress(null);
            }
        }

        return $this;
    }
}
