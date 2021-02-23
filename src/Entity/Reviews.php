<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReviewsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get",
 *          "post" = {"security_post_denormalize"="is_granted('ROLE_USER')"},
 *     },
 *     itemOperations={
 *          "get" = {
 *                  "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *          },
 *          "put" = {
 *                  "security"="is_granted('REVIEW_PUT', object)",
 *                  "security_message"="Solo el propio usuario que la redacto puede modificar las reviews."
 *          },
 *          "delete" ={
 *                  "security"="is_granted('ERASE', object)",
 *                  "security_message"="Solo el propio usuario que la redacto puede eliminar una review"
 *          }
 *      },
 *     attributes={
 *          "pagination_items_per_page" = 10
 *     }
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
     * @Groups({"reviews:read", "reviews:write","user:item:get", "admin:read"})
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
     * @Groups({"reviews:read", "reviews:write","user:item:get", "admin:read"})
     */
    private $user;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"reviews:read", "reviews:write","user:item:get", "admin:read"})
     */
    private $likes = 0;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"reviews:read", "reviews:write","user:item:get", "admin:read"})
     */
    private $stars = 0;

    /**
     * @Groups({"admin:write", "admin:read"})
     * @ORM\Column(type="boolean")
     */
    private $isPublic = false;

    /**
     * @ORM\OneToMany(targetEntity=VotedBy::class, mappedBy="idReview", orphanRemoval=true)
     */
    private $likedBy;

    /**
     * @Groups({"reviews:read"})
     * @var boolean
     */
    public $likedByMe;

    public function __construct()
    {
        $this->likedBy = new ArrayCollection();
    }

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

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(?int $likes): self
    {
        $this->likes = $likes;

        return $this;
    }

    public function getStars(): ?int
    {
        return $this->stars;
    }

    public function setStars(int $stars): self
    {
        $this->stars = $stars;

        return $this;
    }

    public function getIsPublic(): ?bool
    {
        return $this->isPublic;
    }

    public function setIsPublic(bool $isPublic): self
    {
        $this->isPublic = $isPublic;

        return $this;
    }

    /**
     * @return Collection|VotedBy[]
     */
    public function getLikedBy(): Collection
    {
        return $this->likedBy;
    }

    public function addLikedBy(VotedBy $likedBy): self
    {
        if (!$this->likedBy->contains($likedBy)) {
            $this->likedBy[] = $likedBy;
            $likedBy->setIdReview($this);
        }

        return $this;
    }

    public function removeLikedBy(VotedBy $likedBy): self
    {
        if ($this->likedBy->removeElement($likedBy)) {
            // set the owning side to null (unless already changed)
            if ($likedBy->getIdReview() === $this) {
                $likedBy->setIdReview(null);
            }
        }

        return $this;
    }
}
