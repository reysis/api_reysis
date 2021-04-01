<?php


namespace App\DataFixtures;


use App\Entity\Address;
use App\Entity\Taller;
use Doctrine\Persistence\ObjectManager;

class TallerFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(15,'TALLER',function ($i) use ($manager){
            $taller = new Taller();

            $taller->setNombre($this->faker->company);
            $taller->setAlias($this->faker->city);

            $address = new Address();
            $country = $this->faker->country;
            $address->setPostAddress($this->faker->sentence(6,true).', '.$country);
            $address->setIndications($this->faker->sentence(9,true));
            $taller->setAddress($address);

            return $taller;
        });
        $manager->flush();
    }
}