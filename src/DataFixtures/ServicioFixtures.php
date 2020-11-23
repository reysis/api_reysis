<?php


namespace App\DataFixtures;


use App\Entity\MediaObject;
use App\Entity\Servicio;
use App\Entity\TiposServicios;
use Doctrine\Common\Persistence\ObjectManager;

class ServicioFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(30, 'SERVICIO', function ($i) use ($manager){
            $servicio = new Servicio();
            $servicio->setDescripcion($this->faker->paragraph);
            $servicio->setNombre($this->faker->sentence(2,true));
            $servicio->setUpdatedAt(new \DateTime());

            return $servicio;
        });

        $manager->flush();
    }
}