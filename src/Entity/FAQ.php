<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FAQRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"security_post_denormalize"="is_granted('ROLE_ADMIN')"},
 *     },
 *     itemOperations={
 *          "put" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "get" = {
 *                  "method" = "GET",
 *                  "controller" = NotFoundAction::class,
 *                  "read" = false,
 *                  "output" = false
 *          },
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 * )
 * @ORM\Entity(repositoryClass=FAQRepository::class)
 */
class FAQ
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"faq:read", "admin:read","admin:write"})
     */
    private $question;

    /**
     * @ORM\Column(type="text")
     * @Groups({"faq:read", "admin:read","admin:write"})
     */
    private $answer;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $category;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }
}
