<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ConfigurationsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get",
 *          "post"
 *     },
 *     itemOperations={
 *          "get",
 *          "put",
 *          "delete"
 *     }
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ORM\Entity(repositoryClass=ConfigurationsRepository::class)
 */
class Configurations
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * Devuelve verdadero si el servicio a domicilio esta disponible
     *
     * @ORM\Column(type="boolean")
     * @Groups({"configurations:read", "admin:write"})
     */
    private $domicilio = false;

    /**
     * Misión de la empresa parseada a html
     *
     * @ORM\Column(type="text")
     * @Groups({"configurations:read", "admin:write"})
     */
    private $mision;

    /**
     * Visión de la empresa parseada a html
     *
     * @ORM\Column(type="text")
     * @Groups({"configurations:read", "admin:write"})
     */
    private $vision;

    /**
     * Slogan de la empresa
     *
     * @ORM\Column(type="string", length=255)
     * @Groups({"configurations:read", "admin:write"})
     */
    private $slogan;

    /**
     * Frase del footer
     *
     * @ORM\Column(type="string", length=255)
     * @Groups({"configurations:read", "admin:write"})
     */
    private $footerPhrase;

    /**
     * Quienes somos de la empresa parseado a html
     *
     * @ORM\Column(type="text")
     * @Groups({"configurations:read", "admin:write"})
     */
    private $whoWeAre;

    /**
     * Qué hacemos de la empresa parseado a html
     *
     * @ORM\Column(type="text")
     * @Groups({"configurations:read", "admin:write"})
     */
    private $whatWeDo;

    /**
     * Términos y condiciones del contrato de prestación de servicios
     *
     * @ORM\Column(type="text")
     * @Groups({"configurations:read", "admin:write"})
     */
    private $termsAndCondition;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDomicilio(): ?bool
    {
        return $this->domicilio;
    }

    public function setDomicilio(bool $domicilio): self
    {
        $this->domicilio = $domicilio;

        return $this;
    }

    public function getMision(): ?string
    {
        return $this->mision;
    }

    public function setMision(string $mision): self
    {
        $this->mision = $mision;

        return $this;
    }

    public function getVision(): ?string
    {
        return $this->vision;
    }

    public function setVision(string $vision): self
    {
        $this->vision = $vision;

        return $this;
    }

    public function getSlogan(): ?string
    {
        return $this->slogan;
    }

    public function setSlogan(string $slogan): self
    {
        $this->slogan = $slogan;

        return $this;
    }

    public function getFooterPhrase(): ?string
    {
        return $this->footerPhrase;
    }

    public function setFooterPhrase(string $footerPhrase): self
    {
        $this->footerPhrase = $footerPhrase;

        return $this;
    }

    public function getWhoWeAre(): ?string
    {
        return $this->whoWeAre;
    }

    public function setWhoWeAre(string $whoWeAre): self
    {
        $this->whoWeAre = $whoWeAre;

        return $this;
    }

    public function getWhatWeDo(): ?string
    {
        return $this->whatWeDo;
    }

    public function setWhatWeDo(string $whatWeDo): self
    {
        $this->whatWeDo = $whatWeDo;

        return $this;
    }

    public function getTermsAndCondition(): ?string
    {
        return $this->termsAndCondition;
    }

    public function setTermsAndCondition(string $termsAndCondition): self
    {
        $this->termsAndCondition = $termsAndCondition;

        return $this;
    }
}
