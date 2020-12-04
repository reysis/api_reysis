<?php


namespace App\DataFixtures;


use App\Entity\Configurations;
use Doctrine\Persistence\ObjectManager;

class ConfigurationsFixtures extends BaseFixture
{

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(1,'CONFIGURATION',function ($i) use ($manager){
           $configuration = new Configurations();
           $configuration->setDomicilio($this->faker->boolean);
           $configuration->setFooterPhrase($this->faker->sentence(6,true));

           $amongOfParagraph = $this->faker->numberBetween(5, 9);
           $mision = "";
           $vision = "";
           $termsAndConditions = "";
           $whoWeAre = "";
           $whatWeDo = "";
           for($j = 0; $j < $amongOfParagraph;$j++){
               $mision = $mision. $this->faker->paragraph(4,true).'</br>' ;
               $vision = $vision. $this->faker->paragraph(6,true).'</br>' ;
               $termsAndConditions = $termsAndConditions. $this->faker->paragraph(6,true).'</br>' ;
               $whatWeDo = $whatWeDo. $this->faker->paragraph(2,true).'</br>' ;
               $whoWeAre = $whoWeAre. $this->faker->paragraph(3,true).'</br>' ;
           }
           $configuration->setMision($mision);
           $configuration->setVision($vision);
           $configuration->setSlogan($this->faker->sentence(7, true));
           $configuration->setTermsAndCondition($termsAndConditions);
           $configuration->setWhatWeDo($whatWeDo);
           $configuration->setWhoWeAre($whoWeAre);

           return $configuration;
        });

        $manager->flush();
    }
}