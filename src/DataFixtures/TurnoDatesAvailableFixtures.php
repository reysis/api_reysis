<?php


namespace App\DataFixtures;


use App\Entity\TurnoDateAvailable;
use Doctrine\Persistence\ObjectManager;
use phpDocumentor\Reflection\Types\Array_;

class TurnoDatesAvailableFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(30, 'TURNOS_DISPONIBLES',function ($i) use ($manager){
            $turnoDisponible = new TurnoDateAvailable();
            $turnoDisponible->setDate(new \DateTime($this->faker->dateTimeInInterval('now', '+30 days', null)->format("Y-m-d")));
            $hours = [];
            $amout = $this->faker->numberBetween(5, 10);

            for($j = 0;$j < $amout; $j++){
                $hours[] = $this->faker->dateTime->format('g:i A');
            }
            $turnoDisponible->setHours($hours);

            return $turnoDisponible;
        });

        $manager->flush();
    }
}