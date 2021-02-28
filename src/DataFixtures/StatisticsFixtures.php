<?php


namespace App\DataFixtures;


use App\Entity\Estadistica;
use Doctrine\Persistence\ObjectManager;

class StatisticsFixtures extends BaseFixture
{
    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(1,'STATISTICS', function ($i) use ($manager){
            $statistics = new Estadistica();
            $statistics->setFixedEquips(96);
            $statistics->setMediaRating(4.3);
            $statistics->setYearsOfExperience(20);

            return $statistics;
        });

        $manager->flush();
    }
}