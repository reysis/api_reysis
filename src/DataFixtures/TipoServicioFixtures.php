<?php


namespace App\DataFixtures;


use App\Entity\TiposServicios;
use Doctrine\Common\Persistence\ObjectManager;

class TipoServicioFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(30, 'TIPO_SERVICIO', function ($i) use ($manager){
            $tipoServicio = new TiposServicios();
            $tipoServicio->setDescripcion($this->faker->paragraph);
            $tipoServicio->setNombre($this->faker->sentence(2,true));

            return $tipoServicio;
        });

        $manager->flush();
    }
}