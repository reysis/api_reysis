<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\SerializedName;

/**
 * Una persona natural o una empresa
 * 
 * @see http://schema.org/Person Documentation on Schema.org
 * 
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *      iri="http://schema.org/Person",
 *      collectionOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "post" = {
 *              "accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')",
 *              "validation_groups"={"Default", "create"}
 *          }
 *      },
 *      itemOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_USER') and object == user"},
 *          "put" = {"accessControl" = "is_granted('ROLE_USER') and object == user"},
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "username":"partial",
 *          "tipoUsuario":"exact"
 *      }
 * )
 * @UniqueEntity("username")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @ORM\OneToOne(targetEntity=Persona::class, cascade={"persist", "remove"})
     * @Groups({"user:read", "user:write"})
     * @Assert\NotBlank(groups={"create"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     * @Groups({"admin:read","admin:write"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * Una variable temporal para almacenar la password y poder encriptarla en el proceso de normalización
     *
     * @var string The plain password
     * @Groups({"user:write"})
     * @Assert\NotBlank(groups={"create"})
     * @SerializedName("password")
     */
    private $plainPassword;

    /**
     * Los Turnos que tenga el usuario reservados
     * 
     * @ORM\OneToMany(targetEntity=Turno::class, mappedBy="personaCitada", cascade={"persist"}, orphanRemoval=true)
     * @Groups({"user:read"})
     * @Assert\Valid()
     */
    private $turnos;

    /**
     * Empresa a la que pertenece este usuario en caso de que sea una cuenta empresarial
     * 
     * @ORM\OneToOne(targetEntity=Empresa::class, mappedBy="username", cascade={"persist", "remove"})
     */
    private $empresa;

    /**
     * Descripción mas detallada de la persona a la que pertenece esta cuenta en caso de que sea una Persona Natural
     * 
     * @ORM\OneToOne(targetEntity=Persona::class, mappedBy="username", cascade={"persist", "remove"})
     * @Groups({"user:read", "user:write"})
     */
    private $persona;

    /**
     * @ORM\ManyToOne(targetEntity=TipoUsuario::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"user:write", "user:read"})
     * @Assert\NotBlank(groups={"create"})
     */
    private $tipoUsuario;
    /**
     * @ORM\Column(type="string", length=25)
     * @ApiProperty(iri="http://schema.org/telephone")
     * @Groups({"admin:read", "user:write"})
     * @Assert\NotBlank(groups={"create"})
     */
    private $telephone;

    /**
     * @ApiProperty(iri="http://schema.org/email")
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Email()
     * @Groups({"user:read", "user:write"})
     */
    private $email;
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @ApiProperty(iri="http://schema.org/address")
     * @Groups({"user:read","user:write"})
     */
    private $address;

    /**
     * Retorna verdadero si este es el usuario autenticado actualmente
     *
     * @Groups({"user:read"})
    */
    private $isMe;

    public function __construct()
    {
        $this->turnos = new ArrayCollection();
        $this->tipoUser = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    /**
     * @return Collection|Turno[]
     */
    public function getTurnos(): Collection
    {
        return $this->turnos;
    }

    public function addTurno(Turno $turno): self
    {
        if (!$this->turnos->contains($turno)) {
            $this->turnos[] = $turno;
            $turno->setPersonaCitada($this);
        }

        return $this;
    }

    public function removeTurno(Turno $turno): self
    {
        if ($this->turnos->contains($turno)) {
            $this->turnos->removeElement($turno);
            // set the owning side to null (unless already changed)
            if ($turno->getPersonaCitada() === $this) {
                $turno->setPersonaCitada(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TipoUser[]
     */
    public function getTipoUser(): Collection
    {
        return $this->tipoUser;
    }

    public function getEmpresa(): ?Empresa
    {
        return $this->empresa;
    }

    public function setEmpresa(Empresa $empresa): self
    {
        $this->empresa = $empresa;

        // set the owning side of the relation if necessary
        if ($empresa->getUsername() !== $this) {
            $empresa->setUsername($this);
        }

        return $this;
    }

    public function getPersona(): ?Persona
    {
        return $this->persona;
    }

    public function setPersona(Persona $persona): self
    {
        $this->persona = $persona;

        // set the owning side of the relation if necessary
        if ($persona->getUsername() !== $this) {
            $persona->setUsername($this);
        }

        return $this;
    }

    public function getTipoUsuario(): ?TipoUsuario
    {
        return $this->tipoUsuario;
    }

    public function setTipoUsuario(?TipoUsuario $tipoUsuario): self
    {
        $this->tipoUsuario = $tipoUsuario;
        return $this;
    }

    /**
     * Get the plain password
     *
     * @return  string
     */ 
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    /**
     * Set the plain password
     *
     * @param  string  $plainPassword  The plain password
     *
     * @return  self
     */ 
    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * Get the value of telephone
     */ 
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set the value of telephone
     *
     * @return  self
     */ 
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of address
     */ 
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set the value of address
     *
     * @return  self
     */ 
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    public function getIsMe(): bool
    {
        if($this->isMe === null){
            throw new \LogicException("El campo isMe no ha sido inicializado");
        }
        return $this->isMe;
    }

    public function setIsMe(bool $isMe): void
    {
        $this->isMe = $isMe;
    }

}
