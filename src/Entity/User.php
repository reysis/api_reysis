<?php

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
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * Un usuario del sistema, puede ser Persona Natular, Empresa, Proveedor o un Trabajador de la empresa
 *
 * @ApiResource(
 *      attributes={
 *          "pagination_items_per_page" = 10,
 *      },
 *      normalizationContext={"groups"={"admin:read", "owner:read"}},
 *      denormalizationContext={"groups"={"user:write", "owner:write", "turno:write"}},
 *      collectionOperations={
 *          "get",
 *          "post" = {
 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *              "validation_groups"={"Default", "create"}
 *          }
 *      },
 *      itemOperations={
 *          "get" = {"security" = "is_granted('USER_GET', object)"},
 *          "put" = {"security" = "is_granted('USER_PUT', object)"},
 *          "delete" = {"security" = "is_granted('USER_ERASE', object)"}
 *      },
 *
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "username":"partial",
 *          "email":"exact",
 *      }
 * )
 * @UniqueEntity({"username", "email"})
 * @ORM\Entity(repositoryClass=UserRepository::class)
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
     * @Groups({"owner:read", "user:write", "admin:write", "admin:read"})
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
     * @Groups({"user:write", "admin:write", "admin:read"})
     * @Assert\NotBlank(groups={"create"})
     * @SerializedName("password")
     */
    private $plainPassword;

    /**
     * @ApiProperty(iri="http://schema.org/email")
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Email()
     * @Groups({"owner:read", "user:write", "admin:write", "admin:read"})
     */
    private $email;

    /**
     * Retorna verdadero si este es el usuario autenticado actualmente
    */
    private $isMe = false;

    /**
     * Cuentas bancarias del usuario
     *
     * @ORM\OneToMany(targetEntity=CuentaBancaria::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"owner:read","admin:item:get", "admin:write"})
     * @Assert\Valid()
     */
    protected $cuentaBancaria;

    /**
     * Fecha en la que se registró el usuario, solamente se llena cuando al usuario se le va a prestar un servicio
     *
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"admin:read", "admin:write"})
     */
    private $dateRegistered;

    /**
     * Ultima fecha en la que se edito la información de este usuario
     *
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"admin:read", "admin:write"})
     */
    private $lastEdited;

    /**
     * Ultima fecha en la que se logueo el usuario
     *
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"admin:read", "admin:write"})
     */
    private $lastLoggued;

    /**
     * Dirección postal del Usuario
     *
     * @ORM\ManyToOne(targetEntity=Address::class, inversedBy="users", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"user:write", "owner:read", "admin:write", "admin:item:get"})
     * @Assert\Valid()
     * @Assert\NotBlank(groups={"create"})
     */
    private $address;

    /**
     * Números de contacto del usuario
     *
     * @ORM\ManyToMany(targetEntity=PhoneNumber::class, cascade={"persist"})
     * @JoinTable(name="users_phonenumbers",
     *      joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="phonenumber_id", referencedColumnName="id", unique=true)}
     *      )
     * @Groups({"user:write", "owner:read", "admin:item:get", "admin:write"})
     * @Assert\NotBlank(groups={"create"})
     * @Assert\Valid()
     */
    private $phoneNumbers;

    /**
     * Datos del usuario si es de tipo empresa
     *
     * @ORM\OneToOne(targetEntity=Empresa::class, mappedBy="user", cascade={"persist", "remove"})
     * @Groups({"owner:read","admin:read", "admin:write"})
     * @Assert\Valid()
     */
    private $empresa;

    /**
     * Nacionalidad del usuario, ya sea una empresa o una Persona
     *
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:write","owner:read", "admin:read", "admin:write"})
     * @Assert\NotBlank(groups={"create"})
     */
    private $nationality;

    /**
     * Contrato del usuario, este campo solo estará lleno si el usuario es un trabajador
     *
     * @ORM\OneToOne(targetEntity=Contrato::class, inversedBy="user", cascade={"persist", "remove"})
     * @Assert\Valid()
     */
    private $contrato;

    /**
     * Ordenes de servicio emitidas para servicios prestados a este usuario
     *
     * @ORM\OneToMany(targetEntity=OrdenServicio::class, mappedBy="user")
     */
    private $serviceOrder;

    /**
     * Turnos pendientes de este usuario
     *
     * @ORM\OneToMany(targetEntity=Turno::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"user:write","owner:read", "admin:item:get", "admin:write"})
     */
    private $turnos;

    /**
     * Reviews que ha realizado este usuario
     *
     * @ORM\OneToMany(targetEntity=Reviews::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"user:write","owner:read", "admin:item:get", "admin:write"})
     */
    private $reviews;

    /**
     * @ORM\OneToMany(targetEntity=SocialMedia::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"user:read", "user:item:get", "admin:write", "admin:item:get"})
     */
    private $socialMedias;

    /**
     * @ORM\OneToMany(targetEntity=Notification::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"owner:read", "admin:write", "admin:item:get"})
     */
    private $notifications;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isPublic = false;

    /**
     * @ApiProperty(
     *     readableLink=true,
     *     writableLink=true
     * )
     * @Groups({"user:read", "user:write", "reviews:read","admin:write", "admin:item:get"})
     * @var MediaObject
     * @ORM\OneToOne(targetEntity=MediaObject::class, inversedBy="user", cascade={"persist", "remove"})
     */
    private $profilePicture;

    /**
     * @var Persona
     *
     * @ORM\OneToOne(targetEntity=Persona::class, inversedBy="user", cascade={"persist", "remove"})
     * @Groups({"user:read", "user:write", "admin:write", "admin:item:get"})
     * @Assert\NotBlank(groups={"create"})
     */
    private $persona;

    public function __construct()
    {
        $this->cuentaBancaria = new ArrayCollection();
        $this->phoneNumbers = new ArrayCollection();
        $this->serviceOrder = new ArrayCollection();
        $this->turnos = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->socialMedias = new ArrayCollection();
        $this->notifications = new ArrayCollection();
    }

    /**
     * @return int|null
     */
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
        $this->setLastEdited(new \DateTime());

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
        $this->setLastEdited(new \DateTime());

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
        $this->lastEdited = new \DateTime();

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
        $this->lastEdited = new \DateTime();

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
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function getIsMe(): bool
    {
        return $this->isMe;
    }

    public function setIsMe(bool $isMe): void
    {
        $this->isMe = $isMe;
    }

    /**
     * @return Collection|CuentaBancaria[]
     */
    public function getCuentaBancaria(): Collection
    {
        return $this->cuentaBancaria;
    }

    public function addCuentaBancarium(CuentaBancaria $cuentaBancarium): self
    {
        if (!$this->cuentaBancaria->contains($cuentaBancarium)) {
            $this->cuentaBancaria[] = $cuentaBancarium;
            $cuentaBancarium->setUser($this);
        }
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function removeCuentaBancarium(CuentaBancaria $cuentaBancarium): self
    {
        if ($this->cuentaBancaria->contains($cuentaBancarium)) {
            $this->cuentaBancaria->removeElement($cuentaBancarium);
            // set the owning side to null (unless already changed)
            if ($cuentaBancarium->getUser() === $this) {
                $cuentaBancarium->setUser(null);
            }
        }
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function getDateRegistered(): ?\DateTimeInterface
    {
        return $this->dateRegistered;
    }

    public function setDateRegistered(\DateTimeInterface $dateRegistered): self
    {
        $this->dateRegistered = $dateRegistered;
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function getLastEdited(): ?\DateTimeInterface
    {
        return $this->lastEdited;
    }

    public function setLastEdited(\DateTimeInterface $lastEdited): self
    {
        $this->lastEdited = $lastEdited;

        return $this;
    }

    public function getLastLoggued(): ?\DateTimeInterface
    {
        return $this->lastLoggued;
    }

    public function setLastLoggued(\DateTimeInterface $lastLoggued): self
    {
        $this->lastLoggued = $lastLoggued;
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): self
    {
        $this->address = $address;
        $this->lastEdited = new \DateTime();

        return $this;
    }

    /**
     * @return Collection|PhoneNumber[]
     */
    public function getPhoneNumbers(): Collection
    {
        return $this->phoneNumbers;
    }

    public function addPhoneNumber(PhoneNumber $phoneNumber): self
    {
        if (!$this->phoneNumbers->contains($phoneNumber)) {
            $this->phoneNumbers[] = $phoneNumber;
        }
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function removePhoneNumber(PhoneNumber $phoneNumber): self
    {
        if ($this->phoneNumbers->contains($phoneNumber)) {
            $this->phoneNumbers->removeElement($phoneNumber);
        }
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function getEmpresa(): ?Empresa
    {
        return $this->empresa;
    }

    public function setEmpresa(?Empresa $empresa): self
    {
        $this->empresa = $empresa;
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function getNationality(): ?string
    {
        return $this->nationality;
    }

    public function setNationality(string $nationality): self
    {
        $this->nationality = $nationality;
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function getContrato(): ?Contrato
    {
        return $this->contrato;
    }

    public function setContrato(?Contrato $contrato): self
    {
        $this->contrato = $contrato;
        $this->lastEdited = new \DateTime();

        return $this;
    }

    /**
     * @return Collection|OrdenServicio[]
     */
    public function getServiceOrder(): Collection
    {
        return $this->serviceOrder;
    }

    public function addServiceOrder(OrdenServicio $serviceOrder): self
    {
        if (!$this->serviceOrder->contains($serviceOrder)) {
            $this->serviceOrder[] = $serviceOrder;
            $serviceOrder->setUser($this);
        }
        $this->lastEdited = new \DateTime();

        return $this;
    }

    public function removeServiceOrder(OrdenServicio $serviceOrder): self
    {
        if ($this->serviceOrder->contains($serviceOrder)) {
            $this->serviceOrder->removeElement($serviceOrder);
            // set the owning side to null (unless already changed)
            if ($serviceOrder->getUser() === $this) {
                $serviceOrder->setUser(null);
            }
        }
        $this->lastEdited = new \DateTime();

        return $this;
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
            $turno->setUser($this);
        }

        return $this;
    }

    public function removeTurno(Turno $turno): self
    {
        if ($this->turnos->contains($turno)) {
            $this->turnos->removeElement($turno);
            // set the owning side to null (unless already changed)
            if ($turno->getUser() === $this) {
                $turno->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Reviews[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Reviews $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setUser($this);
        }

        return $this;
    }

    public function removeReview(Reviews $review): self
    {
        if ($this->reviews->contains($review)) {
            $this->reviews->removeElement($review);
            // set the owning side to null (unless already changed)
            if ($review->getUser() === $this) {
                $review->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|SocialMedia[]
     */
    public function getSocialMedias(): Collection
    {
        return $this->socialMedias;
    }

    public function addSocialMedia(SocialMedia $socialMedia): self
    {
        if (!$this->socialMedias->contains($socialMedia)) {
            $this->socialMedias[] = $socialMedia;
            $socialMedia->setUser($this);
        }

        return $this;
    }

    public function removeSocialMedia(SocialMedia $socialMedia): self
    {
        if ($this->socialMedias->removeElement($socialMedia)) {
            // set the owning side to null (unless already changed)
            if ($socialMedia->getUser() === $this) {
                $socialMedia->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Notification[]
     */
    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): self
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications[] = $notification;
            $notification->setUser($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): self
    {
        if ($this->notifications->removeElement($notification)) {
            // set the owning side to null (unless already changed)
            if ($notification->getUser() === $this) {
                $notification->setUser(null);
            }
        }

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

    public function getProfilePicture(): ?MediaObject
    {
        return $this->profilePicture;
    }

    public function setProfilePicture(?MediaObject $profilePicture): self
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    public function getPersona(): ?Persona
    {
        return $this->persona;
    }

    public function setPersona(?Persona $persona): self
    {
        $this->persona = $persona;

        return $this;
    }
}
