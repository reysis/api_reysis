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

        //dump($data, $context);

        $uploadedFile = $this->createUploadedFile($data);
        $data->setFile($uploadedFile);
        $data->setUpdatedAt(new \DateTime());

        if(($context['item_operation_name'] ?? null) === 'put'){
            //updateando una imagen existente
            if($data->getServicio()!== null){
                //updateando imagen de servicio
                $data->setFilePath(
                    $this->uploaderHelper->uploadServiceImage($uploadedFile, null)
                );
                //Falta remover la imagen vieja
            }else if($data->getUser() !== null){
                //updateando una imagen de usuario
                $data->setFilePath(
                    $this->uploaderHelper->uploadUserImage($uploadedFile, null)
                );
            }
        }else{
            //creando una nueva imagen
            if($data->getServicio()!== null){
                //creando una imagen de un servicio
                $data->setFilePath(
                    $this->uploaderHelper->uploadServiceImage($uploadedFile, null)
                );
            }else if($data->getUser() !== null){
                //creando una imagen de usuario
                $data->setFilePath(
                    $this->uploaderHelper->uploadUserImage($uploadedFile, null)
                );
            }
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

    private function createUploadedFile($data): File
    {
        $tmpPath = sys_get_temp_dir().'/upload_'.uniqid();
        file_put_contents($tmpPath, $data->getDecodedData());
        return new File($tmpPath);
    }
}