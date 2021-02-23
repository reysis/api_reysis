<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VotedByRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=VotedByRepository::class)
 */
class VotedBy
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Reviews::class, inversedBy="likedBy")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idReview;

    /**
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
