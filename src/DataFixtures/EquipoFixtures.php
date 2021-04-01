<?php


namespace App\DataFixtures;


use App\Entity\Equipo;
use Doctrine\Persistence\ObjectManager;

class EquipoFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(8,'EQUIPO',function ($i) use ($manager){
            $equipo = new Equipo();

            $equipo->setNombre(sprintf("%s_%d",$this->faker->state, $i));

            return $equipo;
        });
        $manager->flush();
    }
}