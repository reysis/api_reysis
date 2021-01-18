<?php


namespace App\DataFixtures;


use App\Entity\Address;
use App\Entity\MediaObject;
use App\Entity\Persona;
use App\Entity\PhoneNumber;
use App\Services\CustomUploaderHelper;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use League\Flysystem\FilesystemInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends BaseFixture
{
    private $passwordEncoder;

    private static $userImages = [
        "user-1.jpg",
        "user-2.jpg",
        "user-3.jpg",
        "user-4.jpg",
        "user-5.jpg",
        "user-6.jpg"
    ];

    private CustomUploaderHelper $uploaderHelper;

    private $publicUploadFilesystem;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        CustomUploaderHelper $uploaderHelper,
        FilesystemInterface $publicUploadFilesystem)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->uploaderHelper = $uploaderHelper;
        $this->publicUploadFilesystem = $publicUploadFilesystem;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->deleteFilesInFilesystem();
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

            $address = new Address();
            $country = $this->faker->country;
            $address->setPostAddress($this->faker->sentence(6,true).', '.$country);
            $address->setIndications($this->faker->sentence(9,true));

            $randomImage = $this->faker->randomElement(self::$userImages);
            $targetPath = __DIR__."/images/".$randomImage;

            $file = new File($targetPath);

            $mediaObject = new MediaObject();
            $mediaObject->setFile($file);
            $mediaObject->setFilePath(
                "user_images/".$this->uploaderHelper->uploadUserImage($file, null)
            );

            //$manager->persist($mediaObject);

            $user->setProfilePicture($mediaObject);
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

        $this->createMany(3, 'admin_users', function($i) use ($manager) {
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
            //$personData->setUser($user);

            $randomImage = $this->faker->randomElement(self::$userImages);
            $targetPath = __DIR__."/images/".$randomImage;

            $file = new File($targetPath);

            $mediaObject = new MediaObject();
            $mediaObject->setFile($file);
            $mediaObject->setFilePath(
                $this->uploaderHelper->uploadUserImage($file, null, 'users_images')
            );

            //$manager->persist($mediaObject);

            $address = new Address();
            $country = $this->faker->country;
            $address->setPostAddress($this->faker->sentence(6,true).', '.$country);
            $address->setIndications($this->faker->sentence(9,true));

            $user->setProfilePicture($mediaObject);
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

    private function deleteFilesInFilesystem()
    {
        $this->publicUploadFilesystem->deleteDir("user_images");
    }
}