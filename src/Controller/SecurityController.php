<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;

class SecurityController extends AbstractController
{
    /**
     * @Route("/api/login", name="app_login", methods={"POST"})
     */
    public function login(IriConverterInterface $iriConverter)
    {
        if(!$this->isGranted('IS_AUTHENTICATED_FULLY')){
            return $this->json([
                'error' => 'Invalid authentication request: check that the Content-Type header is application/json'
            ], 400);
        }
        return new Response(null, 204,[
            'Access-Control-Expose-Headers' => 'Location',
            'Location' => $iriConverter->getIriFromItem( $this->getUser()),
        ]);
    }

    /**
     * @Route("/api/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('should not be reached');
    }
}
