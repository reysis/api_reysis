<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TipoUsuarioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "get" = {"accessControl" = "is_granted('IS_AUTHENTICATED_ANOUNYMOUSLY')"},
 *          "post" = {"security_post_denormalize"="is_granted('POST', object)",
 *                  "security_post_denormalize_message"="Solo un Administrador puede crear Tipos de Servicios"
 *          }
 *     },
 *     itemOperations={
 *          "get" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "put" = {"accessControl" = "is_granted('ROLE_ADMIN')"},
 *          "delete" ={"accessControl" = "is_granted('ROLE_ADMIN')"}
 *      },
 * )
 * @UniqueEntity("tipo")
 * @ORM\Entity(repositoryClass=TipoUsuarioRepository::class)
 */
class TipoUsuario
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"tipousuario:read"})
     */
    private $tipo;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(string $tipo): self
    {
        $this->tipo = $tipo;

        return $this;
    }
}
