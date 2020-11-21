<?php


namespace App\DataFixtures;


use App\Entity\Address;
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

    protected function loadData(\Doctrine\Common\Persistence\ObjectManager $manager)
    {
        $this->createMany(10, 'normal_users', function($i) use ($manager) {
            $user = new User();
            $user->setEmail(sprintf('user%d@example.com', $i));
            $user->setUsername(sprintf('user%d', $i));

            $phoneNumber = new PhoneNumber();
            $phoneNumber->setNumber($this->faker->phoneNumber);
            $phoneNumber->setPhoneType($this->faker->word);
            $user->addPhoneNumber($phoneNumber);

            $address = new Address();
            $address->setNumber($this->faker->buildingNumber);
            $address->setRpto($this->faker->word);
            $address->setStreetE1($this->faker->streetName);
            $address->setStreet($this->faker->streetName);
            $address->setStreetE2($this->faker->streetName);
            $address->setCity($this->faker->city);
            $country = $this->faker->country;
            $address->setCountry($country);

            $user->setAddress($address);
            $user->setNationality($country);
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
            $user->setRoles(['ROLE_ADMIN']);

            $phoneNumber = new PhoneNumber();
            $phoneNumber->setNumber($this->faker->phoneNumber);
            $phoneNumber->setPhoneType($this->faker->word);
            $user->addPhoneNumber($phoneNumber);

            $address2 = new Address();
            $address2->setNumber($this->faker->buildingNumber);
            $address2->setRpto($this->faker->word);
            $address2->setStreetE1($this->faker->streetName);
            $address2->setStreet($this->faker->streetName);
            $address2->setStreetE2($this->faker->streetName);
            $address2->setCity($this->faker->city);
            $country = $this->faker->country;
            $address2->setCountry($country);

            $user->setAddress($address2);
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