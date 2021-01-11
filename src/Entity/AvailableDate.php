<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AvailableDateRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get",
 *          "post" = {
 *                  "security_post_denormalize"="is_granted('ROLE_ADMIN')",
 *                  "security_post_denormalize_message"="Solo un Administrador puede crear Tipos de Servicios",
 *          }
 *     },
 *     itemOperations={
 *          "get" = {"security" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "put" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 * )
 * @ApiFilter(
 *     DateFilter::class, properties={"date"}
 * )
 * @UniqueEntity({"date"})
 * @ORM\Entity(repositoryClass=AvailableDateRepository::class)
 */
class AvailableDate
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"availabledate:read", "admin:write"})
     * @Assert\NotBlank
     */
    private $date;

    /**
     * The current amount of available appointments for the day
     *
     * @ORM\Column(type="integer")
     * @Groups({"availabledate:read", "admin:write"})
     * @Assert\NotBlank
     */
    private $amountAvailable;

    /**
     * The max amount of available appointments for the day
     *
     * @ORM\Column(type="integer")
     * @Groups({"admin:read","admin:write"})
     * @Assert\NotBlank
     */
    private $originalAmount;

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

    public function getAmountAvailable(): ?int
    {
        return $this->amountAvailable;
    }

    public function setAmountAvailable(int $amountAvailable): self
    {
        $this->amountAvailable = $amountAvailable;

        return $this;
    }

    public function getOriginalAmount(): ?int
    {
        return $this->originalAmount;
    }

    public function setOriginalAmount(int $originalAmount): self
    {
        $this->originalAmount = $originalAmount;

        return $this;
    }
}
