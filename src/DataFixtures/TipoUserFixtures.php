<?php


namespace App\DataFixtures;


use App\Entity\TipoUsuario;
use Doctrine\Bundle\FixturesBundle\Fixture;

use Doctrine\Persistence\ObjectManager;

class TipoUserFixtures extends BaseFixture
{
    public const ADMIN_TYPE_REFERENCE = "tipo-administrator";

    protected function loadData(\Doctrine\Common\Persistence\ObjectManager $manager)
    {
        $this->createMany(2, 'normal_types', function ($i) use ($manager){
            $userType = new TipoUsuario();
            $userType->setTipo($this->faker->realText(20));

            return $userType;
        });
        $adminType = new TipoUsuario();
        $adminType->setTipo("ADMINISTRATOR");
        $manager->persist($adminType);

        //Creando referencias para el tipo Administrador
        $this->addReference(self::ADMIN_TYPE_REFERENCE, $adminType);

        $manager->flush();
    }
}