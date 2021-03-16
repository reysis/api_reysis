<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FAQRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"security_post_denormalize"="is_granted('ROLE_ADMIN')"},
 *     },
 *     itemOperations={
 *          "put" = {
 *              "security" = "is_granted('ROLE_ADMIN')"
 *          },
 *          "get" = {
 *              "security" = "is_granted('ROLE_ADMIN')"
 *          },
 *          "delete" ={"security" = "is_granted('ROLE_ADMIN')"}
 *      },
 *     attributes={
 *          "pagination_enabled"=false
 *     },
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "question":"partial",
 *          "category":"exact"
 *      }
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
     * @Groups({"faq:read","admin:read","admin:write"})
     * @Assert\NotBlank
     */
    private $question;

    /**
     * @ORM\Column(type="text")
     * @Groups({"faq:read", "admin:read","admin:write"})
     * @Assert\NotBlank
     */
    private $answer;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"faq:read", "admin:read","admin:write"})
     * @Assert\NotBlank
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
