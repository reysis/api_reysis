<?php


namespace App\DataFixtures;


use App\Entity\Equipo;
use App\Entity\EquipoServicio;
use App\Entity\Servicio;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class EquipoServicioFixtures extends BaseFixture implements DependentFixtureInterface
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(20, 'EQUIPO_SERVICIO', function ($i) use ($manager){
            $equipoServicio = new EquipoServicio();

            $equipo = $this->getRandomReference('EQUIPO');
            $servicio = $this->getRandomReference('SERVICIO');
            $equipoServicio->setServicio($servicio);
            $equipoServicio->setEquipo($equipo);

            return $equipoServicio;
        });
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            ServicioFixtures::class,
            EquipoFixtures::class
        ];
    }
}