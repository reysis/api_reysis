<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CuentaBancariaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=CuentaBancariaRepository::class)
 */
class CuentaBancaria
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="cuentaBancaria")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $numeroCuenta;

    /**
     * @ORM\ManyToOne(targetEntity=TipoCuenta::class, inversedBy="cuentaBancarias")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tipoCuenta;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumeroCuenta(): ?string
    {
        return $this->numeroCuenta;
    }

    public function setNumeroCuenta(string $numeroCuenta): self
    {
        $this->numeroCuenta = $numeroCuenta;

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

    public function getTipoCuenta(): ?TipoCuenta
    {
        return $this->tipoCuenta;
    }

    public function setTipoCuenta(?TipoCuenta $tipoCuenta): self
    {
        $this->tipoCuenta = $tipoCuenta;

        return $this;
    }
}
