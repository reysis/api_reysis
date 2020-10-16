<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\RecursoExtraidoRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=RecursoExtraidoRepository::class)
 */
class RecursoExtraido
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Pieza", inversedBy="recursoExtraidos")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $pieza;

    /**
     * @ORM\Column(type="integer")
     */
    private $cantidad;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fecha;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $receptor;

    /**
     * @ORM\ManyToOne(targetEntity=Trabajador::class, inversedBy="recursoExtraidos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $provedor;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPieza(): ?Pieza
    {
        return $this->pieza;
    }

    public function setPieza(?Pieza $pieza): self
    {
        $this->pieza = $pieza;

        return $this;
    }

    public function getCantidad(): ?int
    {
        return $this->cantidad;
    }

    public function setCantidad(int $cantidad): self
    {
        $this->cantidad = $cantidad;

        return $this;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getReceptor(): ?string
    {
        return $this->receptor;
    }

    public function setReceptor(string $receptor): self
    {
        $this->receptor = $receptor;

        return $this;
    }

    public function getProvedor(): ?Trabajador
    {
        return $this->provedor;
    }

    public function setProvedor(?Trabajador $provedor): self
    {
        $this->provedor = $provedor;

        return $this;
    }

}
