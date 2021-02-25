<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EstadisticaRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=EstadisticaRepository::class)
 */
class Estadistica
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"estadistica:read"})
     * @ORM\Column(type="float", nullable=true)
     */
    private $mediaRating;

    /**
     * @Groups({"estadistica:read"})
     * @ORM\Column(type="integer", nullable=true)
     */
    private $yearsOfExperience;

    /**
     * @Groups({"estadistica:read"})
     * @ORM\Column(type="integer", nullable=true)
     */
    private $fixedEquips;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMediaRating(): ?float
    {
        return $this->mediaRating;
    }

    public function setMediaRating(?float $mediaRating): self
    {
        $this->mediaRating = $mediaRating;

        return $this;
    }

    public function getYearsOfExperience(): ?int
    {
        return $this->yearsOfExperience;
    }

    public function setYearsOfExperience(?int $yearsOfExperience): self
    {
        $this->yearsOfExperience = $yearsOfExperience;

        return $this;
    }

    public function getFixedEquips(): ?int
    {
        return $this->fixedEquips;
    }

    public function setFixedEquips(?int $fixedEquips): self
    {
        $this->fixedEquips = $fixedEquips;

        return $this;
    }
}
