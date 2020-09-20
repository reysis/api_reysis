<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PreguntaFrecuenteRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     iri="http://schema.org/PreguntaFrecuente",
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"}
 *     },
 *     itemOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "put" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "delete" = {
 *                  "security"="is_granted('ERASE', object)",
 *                  "security_message"="No puede realizar esta acción a menos que sea administrador."
 *          }
 *      },
 *      attributes={
 *          "pagination_items_per_page"=10,
 *      }
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "pregunta":"partial",
 *          "respuesta":"partial",
 *      }
 * )
 * @ORM\Entity(repositoryClass=PreguntaFrecuenteRepository::class)
 */
class PreguntaFrecuente
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/pregunta")
     * @Groups({"preguntafrecuente:read", "preguntafrecuente:write", "admin:write"})
     */
    private $pregunta;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/respuesta")
     * @Groups({"preguntafrecuente:read", "preguntafrecuente:write", "admin:write"})
     */
    private $respuesta;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPregunta(): ?string
    {
        return $this->pregunta;
    }

    public function setPregunta(string $pregunta): self
    {
        $this->pregunta = $pregunta;

        return $this;
    }

    public function getRespuesta(): ?string
    {
        return $this->respuesta;
    }

    public function setRespuesta(?string $respuesta): self
    {
        $this->respuesta = $respuesta;

        return $this;
    }
}
