<?php


namespace App\DataFixtures;


use App\Entity\WhyUs;
use Doctrine\Persistence\ObjectManager;

class WhyUsFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(6, "WHYUS", function($i) use ($manager) {
            $whyus = new WhyUs();
            $whyus->setReason($this->faker->sentence);
            $manager->persist($whyus);

            return $whyus;
        });
        $manager->flush();
    }
}