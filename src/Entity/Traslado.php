<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TrasladoRepository;

/**
 * Traslado
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\InheritanceType("JOINED" )
 * @ORM\DiscriminatorColumn(name="discriminante",type="string")
 * @ORM\DiscriminatorMap({"trasladoServicio" = "TrasladoServicio", "trasladoGarantia" = "TrasladoGarantia"})
 * @ORM\Entity(repositoryClass=TrasladoRepository::class)
 */
abstract class Traslado
{
    const TRASLADOSERVICIO = 'trasladoServicio';
    const TRASLADOGARANTIA = 'trasladoGarantia';
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fecha;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $fechaRecibo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Ubicacion", inversedBy="traslados")
     * @ORM\JoinColumn(nullable=false, onDelete="cascade")
     */
    private $ubicacion;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getFechaRecibo(): ?\DateTimeInterface
    {
        return $this->fechaRecibo;
    }

    public function setFechaRecibo(?\DateTimeInterface $fechaRecibo): self
    {
        $this->fechaRecibo = $fechaRecibo;

        return $this;
    }

    public function getUbicacion(): ?Ubicacion
    {
        return $this->ubicacion;
    }

    public function setUbicacion(?Ubicacion $ubicacion): self
    {
        $this->ubicacion = $ubicacion;

        return $this;
    }
}
