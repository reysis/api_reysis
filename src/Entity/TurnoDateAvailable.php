<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TurnoDateAvailableRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=TurnoDateAvailableRepository::class)
 * @ApiFilter(DateFilter::class, properties={"date"})
 */
class TurnoDateAvailable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"turnodateavailable:read", "admin:write"})
     */
    private $date;

    /**
     * @ORM\Column(type="json", nullable=true)
     * @Groups({"turnodateavailable:read", "admin:write"})
     *
     */
    private $hours = [];

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

    public function getHours(): ?array
    {
        return $this->hours;
    }

    public function setHours(?array $hours): self
    {
        $this->hours = $hours;

        return $this;
    }
}
