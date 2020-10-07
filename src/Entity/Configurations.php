<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ConfigurationsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ConfigurationsRepository::class)
 */
class Configurations
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $domicilio;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDomicilio(): ?bool
    {
        return $this->domicilio;
    }

    public function setDomicilio(bool $domicilio): self
    {
        $this->domicilio = $domicilio;

        return $this;
    }
}
