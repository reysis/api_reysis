<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LikeReviewRepository;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\UniqueConstraint;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get" = {"security" = "is_granted('ROLE_ADMIN')"},
 *          "post" = {
 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *              "validation_groups"={"Default", "create"}
 *          }
 *      },
 *      itemOperations={
 *          "get" = {"security" = "is_granted('ROLE_USER')"},
 *          "delete" = {"security" = "is_granted('ROLE_USER')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=LikeReviewRepository::class)
 * @UniqueEntity(
 *     fields={"idReview", "idUser"},
 *     errorPath="idUser",
 *     message="Este usuario ya le ha dado like a esta opinión"
 * )
 * @Table(name="like_review",
 *      uniqueConstraints={
 *          @UniqueConstraint(
 *              name="like_review_unique",
 *              columns={"id_review_id", "id_user_id"}
 *          )
 *      }
 * )
 */
class LikeReview
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"likereview:read", "likereview:write"})
     * @ORM\ManyToOne(targetEntity=Reviews::class, inversedBy="likedBy")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idReview;

    /**
     * @Groups({"likereview:read", "likereview:write"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="likedReviews")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idUser;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdReview(): ?Reviews
    {
        return $this->idReview;
    }

    public function setIdReview(?Reviews $idReview): self
    {
        $this->idReview = $idReview;

        return $this;
    }

    public function getIdUser(): ?User
    {
        return $this->idUser;
    }

    public function setIdUser(?User $idUser): self
    {
        $this->idUser = $idUser;

        return $this;
    }
}
