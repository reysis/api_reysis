<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EmpresaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=EmpresaRepository::class)
 */
class Empresa
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"owner:read", "admin:item:get", "admin:write"})
     */
    private $nit;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"owner:read", "admin:write", "admin:item:get", "admin:read"})
     */
    private $legalName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"admin:item:get", "owner:read", "admin:write"})
     */
    private $cod_reeup;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"admin:item:get", "owner:read", "admin:write"})
     */
    private $no_registro_comercial;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="empresa", cascade={"persist", "remove"})
     */
    private $user;

    public function __construct()
    {
        $this->cuentaBancaria = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    public function getLegalName(): ?string
    {
        return $this->legalName;
    }

    public function setLegalName(string $legalName): self
    {
        $this->legalName = $legalName;

        return $this;
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

    public function getCodReeup(): ?string
    {
        return $this->cod_reeup;
    }

    public function setCodReeup(string $cod_reeup): self
    {
        $this->cod_reeup = $cod_reeup;

        return $this;
    }

    public function getNit(): ?string
    {
        return $this->nit;
    }

    public function setNit(string $nit): self
    {
        $this->nit = $nit;

        return $this;
    }

    public function getNoRegistroComercial(): ?string
    {
        return $this->no_registro_comercial;
    }

    public function setNoRegistroComercial(?string $no_registro_comercial): self
    {
        $this->no_registro_comercial = $no_registro_comercial;

        return $this;
    }
}
