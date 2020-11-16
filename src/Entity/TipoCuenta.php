<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TipoCuentaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=TipoCuentaRepository::class)
 */
class TipoCuenta
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $tipo;

    /**
     * @ORM\OneToMany(targetEntity=CuentaBancaria::class, mappedBy="tipoCuenta", orphanRemoval=true)
     */
    private $cuentaBancarias;

    public function __construct(string $tipo)
    {
        $this->tipo = $tipo;
        $this->cuentaBancarias = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(string $tipo): self
    {
        $this->tipo = $tipo;

        return $this;
    }

    /**
     * @return Collection|CuentaBancaria[]
     */
    public function getCuentaBancarias(): Collection
    {
        return $this->cuentaBancarias;
    }

    public function addCuentaBancaria(CuentaBancaria $cuentaBancaria): self
    {
        if (!$this->cuentaBancarias->contains($cuentaBancaria)) {
            $this->cuentaBancarias[] = $cuentaBancaria;
            $cuentaBancaria->setTipoCuenta($this);
        }

        return $this;
    }

    public function removeCuentaBancaria(CuentaBancaria $cuentaBancaria): self
    {
        if ($this->cuentaBancarias->contains($cuentaBancaria)) {
            $this->cuentaBancarias->removeElement($cuentaBancaria);
            // set the owning side to null (unless already changed)
            if ($cuentaBancaria->getTipoCuenta() === $this) {
                $cuentaBancaria->setTipoCuenta(null);
            }
        }

        return $this;
    }
}
