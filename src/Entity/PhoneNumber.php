<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PhoneNumberRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiProperty;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=PhoneNumberRepository::class)
 */
class PhoneNumber
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"admin:read", "admin:write","owner:write", "owner:read", "phonenumbers:read"})
     */
    private $phoneType;

    /**
     * @ApiProperty(iri="http://schema.org/telephone")
     * @ORM\Column(type="string", length=25)
     * @Groups({"admin:read", "admin:write","owner:write", "owner:read", "phonenumbers:read"})
     */
    private $number;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="phoneNumbers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPhoneType(): ?string
    {
        return $this->phoneType;
    }

    public function setPhoneType(string $phoneType): self
    {
        $this->phoneType = $phoneType;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
