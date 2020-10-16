<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TipoPiezaRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=TipoPiezaRepository::class)
 */
class TipoPieza
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     */
    private $nombre;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Pieza", mappedBy="tipoPieza")
     */
    private $piezas;

    public function __construct()
    {
        $this->piezas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * @return Collection|Pieza[]
     */
    public function getPiezas(): Collection
    {
        return $this->piezas;
    }

    public function addPieza(Pieza $pieza): self
    {
        if (!$this->piezas->contains($pieza)) {
            $this->piezas[] = $pieza;
            $pieza->setTipoPieza($this);
        }

        return $this;
    }

    public function removePieza(Pieza $pieza): self
    {
        if ($this->piezas->contains($pieza)) {
            $this->piezas->removeElement($pieza);
            // set the owning side to null (unless already changed)
            if ($pieza->getTipoPieza() === $this) {
                $pieza->setTipoPieza(null);
            }
        }

        return $this;
    }

    public function __toString(): ?string
    {
        return $this->getNombre();
    }
}
