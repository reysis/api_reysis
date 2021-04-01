<?php


namespace App\DataFixtures;


use App\Entity\EquipoServicio;
use App\Entity\Taller;
use App\Entity\TallerBrindaServicio;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class TallerBrindaServicioFixtures extends BaseFixture implements DependentFixtureInterface
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(15, 'TALLER_BRINDA_SERVICIO', function ($i) use ($manager){
            $tallerBrindaServicio = new TallerBrindaServicio();

            $taller = $this->getRandomReference('TALLER');
            $equipoServicio = $this->getRandomReference('EQUIPO_SERVICIO');
            $tallerBrindaServicio->setTaller($taller);
            $tallerBrindaServicio->setServicioAEquipo($equipoServicio);

            return $tallerBrindaServicio;
        });
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            TallerFixtures::class,
            EquipoServicioFixtures::class
        ];
    }
}