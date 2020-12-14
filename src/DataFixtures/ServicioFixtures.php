<?php


namespace App\DataFixtures;


use App\Entity\MediaObject;
use App\Entity\Servicio;
use Doctrine\Persistence\ObjectManager;
use League\Flysystem\FilesystemInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Filesystem\Filesystem;
use App\Services\CustomUploaderHelper;
use Vich\UploaderBundle\Storage\StorageInterface;

class ServicioFixtures extends BaseFixture
{
    private static $serviceImages = [
        "image-1.png",
        "image-2.png",
        "image-3.png",
        "image-4.png",
        "image-5.png",
        "image-6.png"
    ];

    private $uploaderHelper;

    private $publicFileSystem;

    public function __construct(FilesystemInterface $publicUploadFilesystem, CustomUploaderHelper $uploaderHelper)
    {
        $this->uploaderHelper = $uploaderHelper;
        $this->publicFileSystem = $publicUploadFilesystem;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(6, 'SERVICIO', function ($i) use ($manager){
            $servicio = new Servicio();
            $servicio->setDescripcion($this->faker->paragraph);
            $servicio->setNombre($this->faker->sentence(2,true));

            $randomImage = self::$serviceImages[$i];
            $targetPath = __DIR__."/images/".$randomImage;

            $file = new File($targetPath);

            $mediaObject = new MediaObject();
            $mediaObject->setFile($file);
            $mediaObject->setFilePath(
                $this->uploaderHelper->uploadImage($file, null, 'services_images')
            );

            $manager->persist($mediaObject);

            $servicio->setServiceImage($mediaObject);
            $servicio->setUpdatedAt(new \DateTime());


            return $servicio;
        });

        $manager->flush();
    }
}