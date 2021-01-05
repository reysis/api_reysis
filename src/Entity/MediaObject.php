<?php
// api/src/Entity/MediaObject.php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\DTO\MediaObject\MediaObjectOutput;
<<<<<<< HEAD
use App\DTO\MediaObject\MediaObjectInput;
=======
>>>>>>> 86e250389ab11f18b2c4bc89a904ec9d2aa02f5b

/**
 * @ORM\Entity
 * @ApiResource(
 *     output=MediaObjectOutput::CLASS,
 *     input=MediaObjectInput::CLASS,
 *     iri="http://schema.org/MediaObject",
 *     collectionOperations={
 *         "post",
 *         "get"
 *     },
 *     itemOperations={
 *         "get"
 *     }
 * )
 * @Vich\Uploadable
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
     * @Groups({"mediaobject:read", "servicio:read"})
     * @var string|null
     */
    public $contentUrl;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="typeService", fileNameProperty="filePath")
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
<<<<<<< HEAD
=======
     */
    private $updatedAt;

    /**
     * The base64 encoded version of the file
     *
     * @Groups({"admin:write", "servicio:write", "user:write"})
     * @Assert\NotBlank
     */
    private string $data;

    /**
     * The file name
     *
     * @var string
     * @Groups ({"admin:write", "servicio:write", "user:write"})
     * @Assert\NotBlank
     */
    private string $filename;

    /**
     * @ORM\OneToOne(targetEntity=Servicio::class, mappedBy="serviceImage", cascade={"persist", "remove"})
>>>>>>> 86e250389ab11f18b2c4bc89a904ec9d2aa02f5b
     */
    private $updatedAt;

    /**
<<<<<<< HEAD
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="profilePicture")
     */
    private $user;

    /**
     * @ORM\OneToOne(targetEntity=Servicio::class, mappedBy="serviceImage", cascade={"persist", "remove"})
     */
    private $servicio;
=======
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="profilePicture", cascade={"persist", "remove"})
     */
    private $user;
>>>>>>> 86e250389ab11f18b2c4bc89a904ec9d2aa02f5b

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

<<<<<<< HEAD
=======
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

>>>>>>> 86e250389ab11f18b2c4bc89a904ec9d2aa02f5b
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

<<<<<<< HEAD
    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
=======
    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(Servicio $servicio): self
    {
        $this->servicio = $servicio;

        // set the owning side of the relation if necessary
        if ($servicio->getServiceImage() !== $this) {
            $servicio->setServiceImage($this);
        }
>>>>>>> 86e250389ab11f18b2c4bc89a904ec9d2aa02f5b

        return $this;
    }

<<<<<<< HEAD
    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(Servicio $servicio): self
    {
        $this->servicio = $servicio;

        // set the owning side of the relation if necessary
        if ($servicio->getServiceImage() !== $this) {
            $servicio->setServiceImage($this);
        }

        return $this;
    }

=======
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

    public function setUser(?User $user): self
    {
        // unset the owning side of the relation if necessary
        if ($user === null && $this->user !== null) {
            $this->user->setProfilePicture(null);
        }

        // set the owning side of the relation if necessary
        if ($user !== null && $user->getProfilePicture() !== $this) {
            $user->setProfilePicture($this);
        }

        $this->user = $user;

        return $this;
    }
>>>>>>> 86e250389ab11f18b2c4bc89a904ec9d2aa02f5b
}