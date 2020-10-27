<?php


namespace App\DataFixtures;


use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\DataFixtures\TipoUserFixtures;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends BaseFixture implements DependentFixtureInterface
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    public function getDependencies()
    {
        return [
            TipoUserFixtures::class,
        ];
    }

    protected function loadData(\Doctrine\Common\Persistence\ObjectManager $manager)
    {
        $this->createMany(10, 'normal_users', function($i) use ($manager) {
            $user = new User();
            $user->setEmail(sprintf('user%d@example.com', $i));
            $user->setUsername(sprintf('user%d', $i));
            $user->setTipoUsuario($this->getRandomReference('normal_types'));
            $user->setTelephone(sprintf("%i",$this->faker->randomNumber(8)) );
            $user->setAddress(sprintf("%s", $this->faker->randomAscii()));

            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'engage'
            ));

            $manager->persist($user);


            return $user;
        });

        $this->createMany(3, 'admin_users', function($i) {
            $user = new User();
            $user->setEmail(sprintf('admin%d@reysis.com', $i));
            $user->setUsername(sprintf('admin%d', $i));
            $user->setTipoUsuario($this->getReference(TipoUserFixtures::ADMIN_TYPE_REFERENCE));
            $user->setTelephone(sprintf("%i",$this->faker->randomNumber(8)) );
            $user->setAddress(sprintf("%s", $this->faker->randomAscii()));
            $user->setRoles(['ROLE_ADMIN']);

            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'engage'
            ));

            return $user;
        });

        $manager->flush();

    }
}