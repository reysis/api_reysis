<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AddressRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "post" = {
 *              "accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')",
 *          }
 *      },
 * )
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
     * Calle donde esta ubicada
     *
     * @ORM\Column(type="string", length=100)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $street;

    /**
     * Número de la casa o la empresa en la dirección
     *
     * @ORM\Column(type="string", length=10)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $number;

    /**
     * Entre calle de la dirección
     *
     * @ORM\Column(type="string", length=50)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $streetE1;

    /**
     * Entre calle de la dirección
     *
     * @ORM\Column(type="string", length=50)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $streetE2;

    /**
     * Reparto donde está ubicada
     *
     * @ORM\Column(type="string", length=100)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $rpto;

    /**
     * Ciudad donde esta Ubicada
     *
     * @ORM\Column(type="string", length=100)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $city;

    /**
     * País al que pertenece
     *
     * @ORM\Column(type="string", length=100)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
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
        return $this->streetE1;
    }

    public function setStreetE1(?string $streetE1): self
    {
        $this->streetE1 = $streetE1;

        return $this;
    }

    public function getStreetE2(): ?string
    {
        return $this->streetE2;
    }

    public function setStreetE2(?string $streetE2): self
    {
        $this->streetE2 = $streetE2;

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
