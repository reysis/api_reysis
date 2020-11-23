<?php


namespace App\DataFixtures;


use App\Entity\FAQ;
use Doctrine\Common\Persistence\ObjectManager;

class FAQFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(15, 'main_reviews', function ($i) use ($manager){
            $faq = new FAQ();
            $faq->setQuestion($this->faker->sentence(6, true));
            $faq->setAnswer($this->faker->paragraph);
            $faq->setCategory($this->faker->word);

            return $faq;
        });

        $manager->flush();
    }
}