<?php
// api/src/Entity/MediaObject.php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\MediaObjectRepository;
use App\Doctrine\SetContentUrlOnMediaObjectListener;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     collectionOperations={
 *         "get" = {
 *              "security"="is_granted('ROLE_ADMIN')",
 *              "security_message"="Solo un administrador puede acceder a estos recursos"
 *          },
 *         "post" = {
 *              "security_post_denormalize"="is_granted('MEDIA_OBJECT_POST', object)"
 *          }
 *     },
 *     itemOperations={
 *         "get" = {
 *              "security"="is_granted('MEDIA_OBJECT_GET_SINGLE', object)"
 *          },
 *         "put" = {
 *              "security"="is_granted('MEDIA_OBJECT_PUT', object)"
 *          },
 *         "delete" = {
 *              "security"="is_granted('MEDIA_OBJECT_ERASE', object)"
 *          }
 *     }
 * )
 * @ORM\Entity(repositoryClass=MediaObjectRepository::class)
 * @ORM\EntityListeners({SetContentUrlOnMediaObjectListener::class})
 * @Gedmo\SoftDeleteable(fieldName="deletedAt", timeAware=false, hardDelete=true)
 */
class MediaObject
{
    /**
     * @var int|null
     *
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     */
    protected $id;

    /**
     * @Groups({"mediaobject:read", "servicio:read", "user:read", "reviews:read"})
     * @var string|null
     */
    public $contentUrl;

    /**
     * @var File|null
     */
    public $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     */
    public $filePath;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * The base64 encoded version of the file
     *
     * @Groups({"admin:write", "user:write"})
     * @Assert\NotBlank
     */
    private string $data ="";

    /**
     * The file name
     *
     * @var string
     * @Groups ({"admin:write", "user:write"})
     * @Assert\NotBlank
     */
    private string $filename = "";

    /**
     * @Groups ({"admin:write", "user:write"})
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="profilePicture", cascade={"persist", "remove"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Servicio::class, inversedBy="serviceImages")
     * @ORM\JoinColumn(nullable=true)
     */
    private $servicio;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $deletedAt;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $orphane;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $editing;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $assigned;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;


    public function getId(): ?int
    {
        return $this->id;
    }
    /**
     * @return string
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param string $data
     */
    public function setData($data): void
    {
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * @param mixed $filename
     */
    public function setFilename($filename): void
    {
        $this->filename = $filename;
    }

    /**
     * @return File|null
     */
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * @param File|null $file
     */
    public function setFile(?File $file): void
    {
        $this->file = $file;
    }

    /**
     * @return string|null
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * @param string|null $filePath
     */
    public function setFilePath(?string $filePath): void
    {
        $this->filePath = $filePath;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    /**
     * @param string|null $contentUrl
     */
    public function setContentUrl(?string $contentUrl): void
    {
        $this->contentUrl = $contentUrl;
    }

    /**
     * @return mixed
     */
    public function getDecodedData()
    {
        return base64_decode($this->data);
    }

    /**
     * @param mixed $decodedData
     */
    public function setDecodedData($decodedData): void
    {
        $this->decodedData = $decodedData;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        // set the owning side of the relation if necessary
        if ($user->getProfilePicture() !== $this) {
            $user->setProfilePicture($this);
        }

        $this->user = $user;

        return $this;
    }

    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(?Servicio $servicio): self
    {
        $this->servicio = $servicio;

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

    public function getOrphane(): ?bool
    {
        return $this->orphane;
    }

    public function setOrphane(?bool $orphane): self
    {
        $this->orphane = $orphane;

        return $this;
    }

    public function getEditing(): ?bool
    {
        return $this->editing;
    }

    public function setEditing(?bool $editing): self
    {
        $this->editing = $editing;

        return $this;
    }

    public function getAssigned(): ?bool
    {
        return $this->assigned;
    }

    public function setAssigned(?bool $assigned): self
    {
        $this->assigned = $assigned;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }
}