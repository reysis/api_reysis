<?php


namespace App\DataFixtures;


use App\Entity\AvailableDate;
use App\Entity\TurnoDisponible;
use App\Repository\AvailableDateRepository;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class TurnoDisponibleFixtures extends BaseFixture implements DependentFixtureInterface
{
    private AvailableDateRepository $availableDateRepository;

    public function __construct(AvailableDateRepository $availableDateRepository)
    {
        $this->availableDateRepository = $availableDateRepository;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(15, 'TURNO_DISPONIBLE', function ($i) use ($manager){
            $turnoDisponible = new TurnoDisponible();

            /**
             * @var AvailableDate $availableDate
             */
            $availableDate = $this->getRandomReference('AVAILABLE_DATE');

            $turnoDisponible->setDate($availableDate);
            $turnoDisponible->setServicioTaller($this->getRandomReference('TALLER_BRINDA_SERVICIO'));
            $amount = $this->faker->numberBetween(5,10);
            $turnoDisponible->setOriginalAmount($amount);
            $turnoDisponible->setAmountAvailable($amount);

            return $turnoDisponible;
        });
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            AvailableDateFixtures::class,
            TallerBrindaServicioFixtures::class
        ];
    }
}