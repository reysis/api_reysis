<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\DatoBancarioRepository;


/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=DatoBancarioRepository::class)
 */
class DatoBancario
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Entidad", inversedBy="datoBancarios")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $entidad;

    /**
     * @ORM\Column(type="integer")
     */
    private $numeroCuenta;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tipoMoneda;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titular;

    /**
     * @ORM\Column(type="integer")
     */
    private $agenciaBancaria;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $banco;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $direccionBanco;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEntidad(): ?Entidad
    {
        return $this->entidad;
    }

    public function setEntidad(?Entidad $entidad): self
    {
        $this->entidad = $entidad;

        return $this;
    }

    public function getNumeroCuenta(): ?int
    {
        return $this->numeroCuenta;
    }

    public function setNumeroCuenta(int $numeroCuenta): self
    {
        $this->numeroCuenta = $numeroCuenta;

        return $this;
    }

    public function getTipoMoneda(): ?string
    {
        return $this->tipoMoneda;
    }

    public function setTipoMoneda(string $tipoMoneda): self
    {
        $this->tipoMoneda = $tipoMoneda;

        return $this;
    }

    public function getTitular(): ?string
    {
        return $this->titular;
    }

    public function setTitular(string $titular): self
    {
        $this->titular = $titular;

        return $this;
    }

    public function getAgenciaBancaria(): ?int
    {
        return $this->agenciaBancaria;
    }

    public function setAgenciaBancaria(int $agenciaBancaria): self
    {
        $this->agenciaBancaria = $agenciaBancaria;

        return $this;
    }

    public function getBanco(): ?string
    {
        return $this->banco;
    }

    public function setBanco(string $banco): self
    {
        $this->banco = $banco;

        return $this;
    }

    public function getDireccionBanco(): ?string
    {
        return $this->direccionBanco;
    }

    public function setDireccionBanco(string $direccionBanco): self
    {
        $this->direccionBanco = $direccionBanco;

        return $this;
    }
}
