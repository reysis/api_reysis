<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SocialMediaRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=SocialMediaRepository::class)
 */
class SocialMedia
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","socialmedia:read", "admin:write", "admin:read"})
     */
    private $facebook;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","socialmedia:read", "admin:write", "admin:read"})
     */
    private $linkedin;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","socialmedia:read", "admin:write", "admin:read"})
     */
    private $twitter;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","socialmedia:read", "admin:write", "admin:read"})
     */
    private $youtube;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","socialmedia:read", "admin:write", "admin:read"})
     */
    private $telegram;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="socialMedias")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFacebook(): ?string
    {
        return $this->facebook;
    }

    public function setFacebook(?string $facebook): self
    {
        $this->facebook = $facebook;

        return $this;
    }

    public function getLinkedin(): ?string
    {
        return $this->linkedin;
    }

    public function setLinkedin(?string $linkedin): self
    {
        $this->linkedin = $linkedin;

        return $this;
    }

    public function getTwitter(): ?string
    {
        return $this->twitter;
    }

    public function setTwitter(?string $twitter): self
    {
        $this->twitter = $twitter;

        return $this;
    }

    public function getYoutube(): ?string
    {
        return $this->youtube;
    }

    public function setYoutube(?string $youtube): self
    {
        $this->youtube = $youtube;

        return $this;
    }

    public function getTelegram(): ?string
    {
        return $this->telegram;
    }

    public function setTelegram(?string $telegram): self
    {
        $this->telegram = $telegram;

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
