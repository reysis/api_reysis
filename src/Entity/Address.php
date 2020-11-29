<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AddressRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "post" = {
 *              "accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')",
 *          }
 *      },
 * )
 * @ORM\Entity(repositoryClass=AddressRepository::class)
 */
class Address
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * Calle donde esta ubicada
     *
     * @ORM\Column(type="string", length=100)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $postAddress;

    /**
     * Algunas indicaciones extras que quiera dar el usuario
     *
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"user:write", "owner:read", "turno:write", "admin:item:get", "admin:write"})
     */
    private $indications;


    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="address", orphanRemoval=true)
     */
    private $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setAddress($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getAddress() === $this) {
                $user->setAddress(null);
            }
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPostAddress()
    {
        return $this->postAddress;
    }

    /**
     * @param mixed $postAddress
     */
    public function setPostAddress($postAddress): void
    {
        $this->postAddress = $postAddress;
    }

    /**
     * @return mixed
     */
    public function getIndications()
    {
        return $this->indications;
    }

    /**
     * @param mixed $indications
     */
    public function setIndications($indications): void
    {
        $this->indications = $indications;
    }
}
