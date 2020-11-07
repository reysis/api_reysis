<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AddressRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=AddressRepository::class)
 */
class Address
{
    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="address", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;
    /**
     * @ORM\Column(type="string", length=100)
     */
    private $street;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $number;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $street_e1;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $street_e2;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $rpto;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $country;

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
}
