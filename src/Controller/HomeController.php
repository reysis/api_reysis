<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(SerializerInterface $serializer)
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'user'=> $serializer->serialize($this->getUser(), 'jsonld')
        ]);
    }
}
