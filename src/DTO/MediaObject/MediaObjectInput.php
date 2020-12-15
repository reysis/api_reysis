<?php

namespace App\DTO\MediaObject;

use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiProperty;
use Symfony\Component\Validator\Constraints as Assert;

class MediaObjectInput
{

    /**
     * The name of the file
     *
     * @Groups ({"mediaobject:write", "user:write", "servicio:write"})
     * @var string
     * @Assert\NotBlank
     */
    public $filename;

    /**
     * An string representing the base64 encoded version of the file
     *
     * @Groups ({"mediaobject:write", "user:write", "servicio:write"})
     * @var string
     * @Assert\NotBlank
     */
    private $data;

    private $decodedData;

    /**
     * MediaObjectInput constructor.
     * @param string|null $filename
     * @param string|null $data
     */
    public function __construct(?string $filename = null, ?string $data = null)
    {
        $this->filename = $filename;
        $this->data = $data;
    }

    /**
     * @param mixed $data
     */
    public function setData(?string $data): void
    {
        $this->data = $data;
        $this->decodedData = base64_decode($data);
    }

    /**
     * @return mixed
     */
    public function getDecodedData(): ?string
    {
        return base64_decode($this->data);
    }
}