<?php


namespace App\DataFixtures;


use App\Entity\Notification;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class NotificationsFixtures extends BaseFixture implements DependentFixtureInterface
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(500, 'NOTIFICATION', function ($i) use ($manager){
           $notification = new Notification();
           $notification->setDescription($this->faker->sentence);
           $notification->setDate($this->faker->dateTime);
           $amoungOfNotifications = $this->faker->numberBetween(5,10);
           $notification->setUser($this->getRandomReference('normal_users'));

           $manager->persist($notification);
           return $notification;
        });

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class
        ];
    }
}