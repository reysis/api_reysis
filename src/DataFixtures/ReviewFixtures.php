<?php


namespace App\DataFixtures;


use App\Entity\Reviews;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ReviewFixtures extends BaseFixture implements DependentFixtureInterface
{


    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(200, 'reviews', function ($i) use ($manager){
            $review = new Reviews();
            $review->setDatePublished($this->faker->dateTimeBetween('-100 days', '-1 days'));
            $review->setReviewText($this->faker->paragraph);
            $review->setUser($this->getRandomReference('normal_users'));
            $review->setLikes($this->faker->numberBetween(0, 2000));
            $review->setStars($this->faker->numberBetween(1,5));
            $review->setIsPublic($this->faker->boolean);
            $manager->persist($review);
            return $review;
        });

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}