<?php


namespace App\DataFixtures;


use App\Entity\SocialMedia;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class SocialMediaFixtures extends BaseFixture implements DependentFixtureInterface
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(3, 'SOCIAL_MEDIA',function ($i) use ($manager){
            $socialMedia = new SocialMedia();
            $socialMedia->setFacebook($this->faker->url);
            $socialMedia->setLinkedin($this->faker->url);
            $socialMedia->setTelegram($this->faker->url);
            $socialMedia->setTwitter($this->faker->url);
            $socialMedia->setYoutube($this->faker->url);
            $socialMedia->setUser($this->getRandomReference('admin_users'));

            return $socialMedia;
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