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
     * @ORM\Column(type="datetime")
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
        if($file){
            $this->setUpdatedAt(new \DateTime());
        }
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
        if($filePath){
            $this->setUpdatedAt(new \DateTime());
        }
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
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
}