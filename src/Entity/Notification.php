<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NotificationRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     security="is_granted('ROLE_USER')",
 *     collectionOperations={
 *          "get",
 *     },
 *     itemOperations={
 *          "get",
 *          "put",
 *          "delete"
 *     },
 *     attributes={
 *          "pagination_items_per_page" = 10
 *     },
 * )
 * @ORM\Entity(repositoryClass=NotificationRepository::class)
 * @Gedmo\SoftDeleteable(fieldName="deletedAt", timeAware=false, hardDelete=false)
 */
class Notification
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"notification:read", "admin:write", "admin:read"})
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"notification:read", "admin:write", "admin:read"})
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="notifications")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"admin:write", "admin:item:get"})
     */
    private $user;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"notification:read", "admin:write", "admin:read"})
     */
    private $readed = false;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $deletedAt;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $toMarkAsUnread;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $toMarkAsReaded;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    public function getReaded(): ?bool
    {
        return $this->readed;
    }

    public function setReaded(bool $readed): self
    {
        $this->readed = $readed;

        return $this;
    }

    public function getDeletedAt(): ?\DateTimeInterface
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTimeInterface $deletedAt): self
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    public function getToMarkAsUnread(): ?bool
    {
        return $this->toMarkAsUnread;
    }

    public function setToMarkAsUnread(?bool $toMarkAsUnread): self
    {
        $this->toMarkAsUnread = $toMarkAsUnread;

        return $this;
    }

    public function getToMarkAsReaded(): ?bool
    {
        return $this->toMarkAsReaded;
    }

    public function setToMarkAsReaded(?bool $toMarkAsReaded): self
    {
        $this->toMarkAsReaded = $toMarkAsReaded;

        return $this;
    }
}
