<?php


namespace App\DataFixtures;


use App\Entity\AvailableDate;
use Doctrine\Persistence\ObjectManager;

class AvailableDateFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(10,'AVAILABLE_DATE',function ($i) use ($manager){
            $availableDate = new AvailableDate();
            $availableDate->setDate($this->faker->dateTimeBetween('now', '+30 days'));
            $availableDate->setAmountAvailable($this->faker->numberBetween(1,10));

            return $availableDate;
        });

        $manager->flush();
    }
}