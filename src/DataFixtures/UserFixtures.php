<?php


namespace App\DataFixtures;


use App\Entity\Address;
use App\Entity\Persona;
use App\Entity\PhoneNumber;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends BaseFixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(10, 'normal_users', function($i) use ($manager) {
            $user = new User();
            $user->setEmail(sprintf('user%d@example.com', $i));
            $user->setUsername(sprintf('user%d', $i));

            $phoneNumber = new PhoneNumber();
            $phoneNumber->setNumber($this->faker->phoneNumber);
            $phoneNumber->setPhoneType($this->faker->word);
            $user->addPhoneNumber($phoneNumber);

            $personData = new Persona();
            $personData->setNombre($this->faker->name);
            $personData->setCi($this->faker->numberBetween(10000000000,99999999999));
            $personData->setUser($user);

            $address = new Address();
            $country = $this->faker->country;
            $address->setPostAddress($this->faker->sentence(6,true).', '.$country);
            $address->setIndications($this->faker->sentence(9,true));

            $user->setAddress($address);
            $user->setNationality($country);
            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'engage'
            ));
            $user->setPersona($personData);

            $manager->persist($user);

            return $user;
        });

        $this->createMany(3, 'admin_users', function($i) {
            $user = new User();
            $user->setEmail(sprintf('admin%d@reysis.com', $i));
            $user->setUsername(sprintf('admin%d', $i));
            $user->setRoles(['ROLE_ADMIN', 'ROLE_WORKER']);
            $user->setIsPublic(true);

            $phoneNumber = new PhoneNumber();
            $phoneNumber->setNumber($this->faker->phoneNumber);
            $phoneNumber->setPhoneType($this->faker->word);
            $user->addPhoneNumber($phoneNumber);

            $personData = new Persona();
            $personData->setNombre($this->faker->name);
            $personData->setCi($this->faker->numberBetween(10000000000,99999999999));
            $personData->setUser($user);

            $address = new Address();
            $country = $this->faker->country;
            $address->setPostAddress($this->faker->sentence(6,true).', '.$country);
            $address->setIndications($this->faker->sentence(9,true));

            $user->setPersona($personData);
            $user->setAddress($address);
            $user->setNationality($country);
            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'engage'
            ));

            return $user;
        });

        $manager->flush();

    }
}