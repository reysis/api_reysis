<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\MediaObject;
use App\Entity\Servicio;
use App\Services\CustomUploaderHelper;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;

class ServicioDataPersister implements ContextAwareDataPersisterInterface
{
    private DataPersisterInterface $decoratedDataPersister;
    /**
     * @var CustomUploaderHelper
     */
    private CustomUploaderHelper $uploaderHelper;

    public function __construct(DataPersisterInterface $decoratedDataPersister, CustomUploaderHelper $uploaderHelper)
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->uploaderHelper = $uploaderHelper;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Servicio;
    }

    /**
     * @param Servicio $data
     * @param array $context
     * @return object|void
     */
    public function persist($data, array $context = [])
    {
        $data->setUpdatedAt(new \DateTime());

        if(!($context['item_opeartion_name'] ?? null) === 'put'){
            //Si estoy creando el servicio creo el MediaObject nuevo
            $this->createNewUploadedFile($data);
        }else{
            //Estoy updateando el servicio y aqui puedo crear una traza de que el servicio ha sido modificado

            //Si lo que se esta updateando es la imagen entonces no existe y por lo tanto no tiene ID
            if(!$data->getServiceImage()->getId()){
                $this->createNewUploadedFile($data);
            }
            //$this->logger->info(sprintf('Usuario %s esta siendo actualizado', $data->getId()));
        }

        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }

    private function createNewUploadedFile($data)
    {
        $tmpPath = sys_get_temp_dir().'/service_upload_'.uniqid();
        file_put_contents($tmpPath, $data->getServiceImage()->getDecodedData());
        $uploadedFile = new File($tmpPath);

        if(!$uploadedFile){
            return new Response('El campo filename no debe estar vacio', 400);
        }

        $data->getServiceImage()->setFile($uploadedFile);
        $data->getServiceImage()->setFilePath(
            $this->uploaderHelper->uploadServiceImage($uploadedFile, $data->getServiceImage()->getFile())
        );
    }
}