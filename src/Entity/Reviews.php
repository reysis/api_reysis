<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReviewsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"security_post_denormalize"="is_granted('ROLE_USER')"},
 *     },
 *     itemOperations={
 *          "get" = {
 *                  "security" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')",
 *          },
 *          "put" = {
 *                  "security" = "is_granted('PUT', object)",
 *                  "security_message" = "Solo el propio usuario que la redacto puede modificar las reviews."
 *          },
 *          "delete" ={
 *                  "security" = "is_granted('DELETE', object)",
 *                  "security_message" = "Solo el propio usuario que la redacto puede eliminar una review"
 *          }
 *      },
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "reviewText":"partial",
 *          "user":"exact"
 *      }
 * )
 * @ApiFilter(
 *     DateFilter::class,
 *     properties={
            "datePublished"
 *     }
 * )
 * @ORM\Entity(repositoryClass=ReviewsRepository::class)
 */
class Reviews
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"reviews:read", "user:item:get", "admin:read"})
     */
    private $reviewText;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reviews:read", "user:item:get", "admin:read"})
     */
    private $datePublished;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reviews")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"reviews:read", "user:item:get", "admin:read"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReviewText(): ?string
    {
        return $this->reviewText;
    }

    public function setReviewText(string $reviewText): self
    {
        $this->reviewText = $reviewText;

        return $this;
    }

    public function getDatePublished(): ?\DateTimeInterface
    {
        return $this->datePublished;
    }

    public function setDatePublished(\DateTimeInterface $datePublished): self
    {
        $this->datePublished = $datePublished;

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
}
