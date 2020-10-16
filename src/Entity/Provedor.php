<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProvedorRepository;

/**
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "delete"}
 * )
 * @ORM\Entity(repositoryClass=ProvedorRepository::class)
 */
class Provedor extends Persona
{
    protected $discriminante = self::PROVEDOR;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pais;

    /**
     * @ORM\Column(type="integer")
     */
    private $whatsapp;

    public function getPais(): ?string
    {
        return $this->pais;
    }

    public function setPais(string $pais): self
    {
        $this->pais = $pais;

        return $this;
    }

    public function getWhatsapp(): ?int
    {
        return $this->whatsapp;
    }

    public function setWhatsapp(int $whatsapp): self
    {
        $this->whatsapp = $whatsapp;

        return $this;
    }
}
