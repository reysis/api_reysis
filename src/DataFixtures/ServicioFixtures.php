<?php


namespace App\DataFixtures;


use App\Entity\MediaObject;
use App\Entity\Servicio;
use App\Repository\MediaObjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use League\Flysystem\FilesystemInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Filesystem\Filesystem;
use App\Services\CustomUploaderHelper;

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

    private $mediaObjectRepository;

    public function __construct(
        FilesystemInterface $publicUploadFilesystem,
        CustomUploaderHelper $uploaderHelper,
        MediaObjectRepository $mediaObjectRepository)
    {
        $this->uploaderHelper = $uploaderHelper;
        $this->publicFileSystem = $publicUploadFilesystem;
        $this->mediaObjectRepository = $mediaObjectRepository;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->deleteFilesInFilesystem();
        $this->createMany(6, 'SERVICIO', function ($i) use ($manager){
            $servicio = new Servicio();
            $servicio->setDescripcion($this->faker->paragraph);
            $servicio->setNombre($this->faker->sentence(2,true));

            $amountOfImagesPerService = $this->faker->numberBetween(1,3);

            for($i = 0;$i < $amountOfImagesPerService;$i++){
                $randomImage = self::$serviceImages[$i];
                $targetPath = __DIR__."/images/".$randomImage;

                $file = new File($targetPath);

                $mediaObject = new MediaObject();
                $mediaObject->setFile($file);
                $mediaObject->setFilePath(
                    "service_image/".$this->uploaderHelper->uploadServiceImage($file, null)
                );
                $manager->persist($mediaObject);
                $servicio->addServiceImage($mediaObject);
            }
            $servicio->setUpdatedAt(new \DateTime());

            return $servicio;
        });

        $manager->flush();
    }

    private function deleteFilesInFilesystem()
    {
        $this->publicFileSystem->deleteDir("service_image");
    }
}