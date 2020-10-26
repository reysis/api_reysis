<?php


namespace App\DataFixtures;


use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        for($i = 0; $i < 20; $i++){
            $user = new User();
            $user->setUsername(sprintf('user%d', $i));
            $user->setTelephone(sprintf('%d', random_int(50000000,59999999)));
            $user->setEmail(sprintf('user%d@example.com', $i));
            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'engage'
            ));

            $manager->persist($user);
        }

        for($i = 0; $i < 3; $i++){
            $user = new User();
            $user->setUsername(sprintf('admin%d', $i));
            $user->setTelephone(sprintf('%d', random_int(50000000,59999999)));
            $user->setEmail(sprintf('admin%d@reysis.com', $i));
            $user->setRoles(['ROLE_ADMIN']);

            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'engage'
            ));

            $manager->persist($user);
        }

        $manager->flush();
    }
}