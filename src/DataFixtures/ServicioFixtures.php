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
        "opinion-img-1.jpg",
        "opinion-img-2.jpg",
        "opinion-img-3.jpg"
    ];

    private $uploaderHelper;

    private $publicFileSystem;

    private $storage;

    public function __construct(FilesystemInterface $publicUploadFilesystem, CustomUploaderHelper $uploaderHelper, StorageInterface $storage)
    {
        $this->uploaderHelper = $uploaderHelper;
        $this->publicFileSystem = $publicUploadFilesystem;
        $this->storage = $storage;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(30, 'SERVICIO', function ($i) use ($manager){
            $servicio = new Servicio();
            $servicio->setDescripcion($this->faker->paragraph);
            $servicio->setNombre($this->faker->sentence(2,true));

            $randomImage = $this->faker->randomElement(self::$serviceImages);
            $targetPath = sys_get_temp_dir().'/'.$randomImage;

            $file = new File($targetPath);

            $mediaObject = new MediaObject();
            $mediaObject->setFile($file);
            $mediaObject->setFilePath(
                $this->uploaderHelper->uploadServiceImage($file, null)
            );

            $manager->persist($mediaObject);

            $servicio->addImage($mediaObject);
            $servicio->setUpdatedAt(new \DateTime());


            return $servicio;
        });

        $manager->flush();
    }
}