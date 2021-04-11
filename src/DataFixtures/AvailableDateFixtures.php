<?php


namespace App\DataFixtures;


use App\Entity\AvailableDate;
use Doctrine\Persistence\ObjectManager;

class AvailableDateFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(20,'AVAILABLE_DATE',function ($i) use ($manager){
            $availableDate = new AvailableDate();
            /**
             * @var \DateTime $date
             */
            date_default_timezone_set('America/Havana');
            $date = $this->faker->dateTimeBetween("now","30 days");
            $dateFormated = date_format($date, 'd/m/Y');
            $arrayDate = explode('/', $dateFormated);
            $availableDate->setDate($date);
            $hour = date_format($date, 'g:i A');
            $amPm = explode(' ', $hour);
            $arrayHour = explode(':', $hour);
            $availableDate->setDia((int)$arrayDate[0]);
            $availableDate->setMes((int)$arrayDate[1]);
            $availableDate->setYear((int)$arrayDate[2]);
            $availableDate->setHora((int)$arrayHour[0]);
            $availableDate->setMinutos((int)$arrayHour[1]);
            $availableDate->setAmPm($amPm[1]);

            return $availableDate;
        });

        $manager->flush();
    }
}