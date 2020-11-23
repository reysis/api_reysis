<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CuentaBancoRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=CuentaBancoRepository::class)
 */
class CuentaBanco
{

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity=CuentaBancaria::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $idCuentaBancaria;

    /**
     * @ORM\Id
     * @ORM\OneToOne(targetEntity=Banco::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $idBanco;

    public function __construct(CuentaBancaria $cuentaBancaria, Banco $banco)
    {
        $this->idBanco = $banco;
        $this->idCuentaBancaria = $cuentaBancaria;
    }

    public function getIdCuentaBancaria(): ?CuentaBancaria
    {
        return $this->idCuentaBancaria;
    }

    public function setIdCuentaBancaria(CuentaBancaria $idCuentaBancaria): self
    {
        $this->idCuentaBancaria = $idCuentaBancaria;

        return $this;
    }

    public function getIdBanco(): ?Banco
    {
        return $this->idBanco;
    }

    public function setIdBanco(Banco $idBanco): self
    {
        $this->idBanco = $idBanco;

        return $this;
    }
}
