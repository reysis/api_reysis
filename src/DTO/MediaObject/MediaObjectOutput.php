<?php


namespace App\DTO\MediaObject;

use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiProperty;

class MediaObjectOutput
{
    /**
     * Public URL for the image from service
     *
     * @ApiProperty(iri="http://schema.org/contentUrl")
     * @var string
     * @Groups({"mediaobject:read", "servicio:read", "user:read"})
     */
    public $contentUrl;

    /**
     * @return string
     */
    public function getContentUrl(): string
    {
        return $this->contentUrl;
    }
}