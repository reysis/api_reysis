<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\MediaObject;
use App\Services\CustomUploaderHelper;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;

class MediaObjectDataPersister implements ContextAwareDataPersisterInterface
{
    private $decoratedDataPersister;
    /**
     * @var CustomUploaderHelper
     */
    private $uploaderHelper;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        CustomUploaderHelper $uploaderHelper)
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->uploaderHelper = $uploaderHelper;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof MediaObject;
    }

    /**
     * @param MediaObject $data
     * @param array $context
     * @return object|void
     */
    public function persist($data, array $context = [])
    {
        $data->setUpdatedAt(new \DateTime());

        $tmpPath = sys_get_temp_dir().'/public_upload_'.uniqid();
        file_put_contents($tmpPath, $data->getDecodedData());
        $uploadedFile = new File($tmpPath);

        if(!$uploadedFile){
            return new Response('El campo file no debe estar vacio', 400);
        }
        if(!$data->getId()){
            //Se acaba de hacer upload a una imagen nueva
            $data->setFile($uploadedFile);
            $data->setFilePath(
                $this->uploaderHelper->uploadPublicImage($uploadedFile, $data->getFilename())
            );
        }

        $this->decoratedDataPersister->persist($data);
    }

    /**
     * @param MediaObject $data
     * @param array $context
     * @throws \Exception
     */
    public function remove($data, array $context = [])
    {
        if($data->getServicio())
            $this->uploaderHelper->removeIfExistPublic($data->getFilePath(), 'service_image');
        else
            $this->uploaderHelper->removeIfExistPublic($data->getFilePath(), 'user_images');
        $this->decoratedDataPersister->remove($data);
    }
}