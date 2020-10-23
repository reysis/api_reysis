<?php


namespace App\DataFixtures;


use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MediaObjectFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        //implement media objects fixtures.
        $manager->flush();
    }
}