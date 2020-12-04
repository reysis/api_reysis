<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContactMessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get",
 *          "post"
 *     },
 *     itemOperations={
 *          "get",
 *          "delete"
 *     }
 * )
 * @ORM\Entity(repositoryClass=ContactMessageRepository::class)
 */
class ContactMessage
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"contactmessage:write", "admin:read", "admin:write"})
     */
    private $nombre;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"contactmessage:write", "admin:read", "admin:write"})
     */
    private $fromEmail;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"contactmessage:write", "admin:read", "admin:write"})
     */
    private $contactPhone;

    /**
     * @ORM\Column(type="text")
     * @Groups({"contactmessage:write", "admin:read", "admin:write"})
     */
    private $message;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateSent;

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

    public function getFromEmail(): ?string
    {
        return $this->fromEmail;
    }

    public function setFromEmail(?string $fromEmail): self
    {
        $this->fromEmail = $fromEmail;

        return $this;
    }

    public function getContactPhone(): ?string
    {
        return $this->contactPhone;
    }

    public function setContactPhone(string $contactPhone): self
    {
        $this->contactPhone = $contactPhone;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getDateSent(): ?\DateTimeInterface
    {
        return $this->dateSent;
    }

    public function setDateSent(\DateTimeInterface $dateSent): self
    {
        $this->dateSent = $dateSent;

        return $this;
    }
}
