<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ContratoRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=ContratoRepository::class)
 */
class Contrato
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $codigo;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fechaFin;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\FichaCliente", inversedBy="contratos")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $fichaCliente;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Servicio", mappedBy="contrato")
     */
    private $servicios;

    public function __construct()
    {
        $this->agendas = new ArrayCollection();
        $this->servicios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodigo(): ?string
    {
        return $this->codigo;
    }

    public function setCodigo(string $codigo): self
    {
        $this->codigo = $codigo;

        return $this;
    }

    public function getFechaFin(): ?\DateTimeInterface
    {
        return $this->fechaFin;
    }

    public function setFechaFin(\DateTimeInterface $fechaFin): self
    {
        $this->fechaFin = $fechaFin;

        return $this;
    }

    public function getFichaCliente(): ?FichaCliente
    {
        return $this->fichaCliente;
    }

    public function setFichaCliente(?FichaCliente $fichaCliente): self
    {
        $this->fichaCliente = $fichaCliente;

        return $this;
    }

    /**
     * @return Collection|Servicio[]
     */
    public function getServicios(): Collection
    {
        return $this->servicios;
    }

    public function addServicio(Servicio $servicio): self
    {
        if (!$this->servicios->contains($servicio)) {
            $this->servicios[] = $servicio;
            $servicio->setContrato($this);
        }

        return $this;
    }

    public function removeServicio(Servicio $servicio): self
    {
        if ($this->servicios->contains($servicio)) {
            $this->servicios->removeElement($servicio);
            // set the owning side to null (unless already changed)
            if ($servicio->getContrato() === $this) {
                $servicio->setContrato(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
       return $this->getCodigo();
    }
}
