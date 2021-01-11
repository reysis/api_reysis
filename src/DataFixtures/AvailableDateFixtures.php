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
            $amount = $this->faker->numberBetween(5, 10);
            $availableDate->setAmountAvailable($amount);
            $availableDate->setOriginalAmount($amount);
            return $availableDate;
        });

        $manager->flush();
    }
}