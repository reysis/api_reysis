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
            /**
             * @var \DateTime $date
             */
            date_default_timezone_set('America/Havana');
            $date = $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d H:i:00');
            $availableDate->setDate(new \DateTime($date) );
            $amount = $this->faker->numberBetween(5, 10);
            $availableDate->setAmountAvailable($amount);
            $availableDate->setOriginalAmount($amount);
            return $availableDate;
        });

        $manager->flush();
    }
}