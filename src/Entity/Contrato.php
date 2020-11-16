<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContratoRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ContratoRepository::class)
 */
class Contrato
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $initialDate;

    /**
     * @ORM\Column(type="datetime")
     */
    private $finalDate;

    /**
     * @ORM\Column(type="float")
     */
    private $salario;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $bonoPorServicio;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="contrato", cascade={"persist", "remove"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInitialDate(): ?\DateTimeInterface
    {
        return $this->initialDate;
    }

    public function setInitialDate(\DateTimeInterface $initialDate): self
    {
        $this->initialDate = $initialDate;

        return $this;
    }

    public function getFinalDate(): ?\DateTimeInterface
    {
        return $this->finalDate;
    }

    public function setFinalDate(\DateTimeInterface $finalDate): self
    {
        $this->finalDate = $finalDate;

        return $this;
    }

    public function getSalario(): ?float
    {
        return $this->salario;
    }

    public function setSalario(float $salario): self
    {
        $this->salario = $salario;

        return $this;
    }

    public function getBonoPorServicio(): ?float
    {
        return $this->bonoPorServicio;
    }

    public function setBonoPorServicio(?float $bonoPorServicio): self
    {
        $this->bonoPorServicio = $bonoPorServicio;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        // set (or unset) the owning side of the relation if necessary
        $newContrato = null === $user ? null : $this;
        if ($user->getContrato() !== $newContrato) {
            $user->setContrato($newContrato);
        }

        return $this;
    }
}
