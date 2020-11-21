<?php


namespace App\DataFixtures;


use App\Entity\Reviews;
use Doctrine\Common\Persistence\ObjectManager;

class ReviewFixtures extends BaseFixture
{


    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(50, 'main_reviews', function ($i) use ($manager){
            $review = new Reviews();
            $review->setDatePublished($this->faker->dateTimeBetween('-100 days', '-1 days'));
            $review->setReviewText($this->faker->paragraph);

            return $review;
        });

        $manager->flush();
    }
}