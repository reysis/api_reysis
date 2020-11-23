<?php


namespace App\Services;


use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Gedmo\Sluggable\Util\Urlizer;
use League\Flysystem\AdapterInterface;
use League\Flysystem\FileNotFoundException;
use League\Flysystem\FilesystemInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Asset\Context\RequestStackContext;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploaderHelper
{
    private $uploadPath;
    private $entityManager;

    public function __construct(string $uploadPath, EntityManagerInterface $entityManager)
    {
        $this->uploadPath = $uploadPath;
        $this->entityManager = $entityManager;
    }

    public function uploadMediaObject(UploadedFile $uploadedFile) :string
    {
        $destination = $this->uploadPath.'/upload';
        $mediaObject = new MediaObject();

    }
}