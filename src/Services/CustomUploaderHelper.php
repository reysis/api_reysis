<?php

namespace App\Services;

use Gedmo\Sluggable\Util\Urlizer;
use League\Flysystem\AdapterInterface;
use League\Flysystem\FileNotFoundException;
use League\Flysystem\FilesystemInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Asset\Context\RequestStackContext;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class CustomUploaderHelper
{
    const SERVICES_IMAGE = 'service_image';
    const PUBLIC_IMAGE = 'public_images';
    const USER_IMAGE = 'user_images';

    //const ARTICLE_REFERENCE = 'article_reference';

    private $publicFilesystem;

    private $privateFilesystem;

    private $requestStackContext;

    private $logger;

    private $publicAssetBaseUrl;

    public function __construct(
        FilesystemInterface $publicUploadsFilesystem,
        FilesystemInterface $privateUploadsFilesystem,
        RequestStackContext $requestStackContext,
        LoggerInterface $logger,
        string $uploadedAssetsBaseUrl)
    {
        $this->publicFilesystem = $publicUploadsFilesystem;
        $this->privateFilesystem = $privateUploadsFilesystem;
        $this->requestStackContext = $requestStackContext;
        $this->logger = $logger;
        $this->publicAssetBaseUrl = $uploadedAssetsBaseUrl;
    }

    public function uploadServiceImage(File $file, ?string $existingFilename)
    {
        $newFilename = $this->uploadFile($file, self::SERVICES_IMAGE,true);
        $this->removeIfExistPublic($existingFilename, self::SERVICES_IMAGE);

        return $newFilename;
    }

    public function uploadUserImage(File $file, ?string $existingFilename)
    {
        $newFilename = $this->uploadFile($file, self::USER_IMAGE,true);

        $this->removeIfExistPublic($existingFilename, self::USER_IMAGE);

        return $newFilename;
    }


    public function uploadPublicImage(File $file, ?string $existingFilename): string
    {
        $newFilename = $this->uploadFile($file, self::PUBLIC_IMAGE, true);
        $this->removeIfExistPublic($existingFilename, self::PUBLIC_IMAGE);

        return $newFilename;
    }

    public function getPublicPath(string $path): string
    {
        $fullPath = $this->publicAssetBaseUrl.'/'.$path;
        // if it's already absolute, just return
        if (strpos($fullPath, '://') !== false) {
            return $fullPath;
        }

        // needed if you deploy under a subdirectory
        return $this->requestStackContext
                ->getBasePath().$fullPath;
    }

    private function uploadFile(File $file, string $directory, bool $isPublic): string
    {
        if ($file instanceof UploadedFile) {
            $originalFilename = $file->getClientOriginalName();
        } else {
            $originalFilename = $file->getFilename();
        }
        $newFilename = Urlizer::urlize(pathinfo($originalFilename, PATHINFO_FILENAME)).'-'.uniqid().'.'.$file->guessExtension();
        //dd($newFilename, $directory);
        $filesystem = $isPublic ? $this->publicFilesystem : $this->privateFilesystem;

        $stream = fopen($file->getPathname(), 'r');
        $result = $filesystem->writeStream(
            $directory.'/'.$newFilename,
            $stream,
            [
                'visibility' => $isPublic ? AdapterInterface::VISIBILITY_PUBLIC : AdapterInterface::VISIBILITY_PRIVATE
            ]
        );

        if ($result === false) {
            throw new \Exception(sprintf('Could not write uploaded file "%s"', $newFilename));
        }

        if (is_resource($stream)) {
            fclose($stream);
        }

        return $directory.'/'.$newFilename;
    }

    /**
     * @param string|null $existingFilename
     * @throws \Exception
     */
    public function removeIfExistPublic(?string $existingFilename, string $destination): void
    {
        if ($existingFilename) {
            try {
                $result = $this->publicFilesystem->delete($destination . '/' . $existingFilename);

                if ($result === false) {
                    throw new \Exception(sprintf('Could not delete old uploaded file "%s"', $existingFilename));
                }
            } catch (FileNotFoundException $e) {
                $this->logger->alert(sprintf('Old uploaded file "%s" was missing when trying to delete', $existingFilename));
            }
        }
    }
    /**
     * @param string|null $existingFilename
     * @throws \Exception
     */
    public function removeIfExistPrivate(?string $existingFilename, string $destination): void
    {
        if ($existingFilename) {
            try {
                $result = $this->privateFilesystem->delete($destination . '/' . $existingFilename);

                if ($result === false) {
                    throw new \Exception(sprintf('Could not delete old uploaded file "%s"', $existingFilename));
                }
            } catch (FileNotFoundException $e) {
                $this->logger->alert(sprintf('Old uploaded file "%s" was missing when trying to delete', $existingFilename));
            }
        }
    }
}
