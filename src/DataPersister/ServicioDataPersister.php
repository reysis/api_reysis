<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\MediaObject;
use App\Entity\Servicio;
use App\Services\CustomUploaderHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;

class ServicioDataPersister implements ContextAwareDataPersisterInterface
{
    private DataPersisterInterface $decoratedDataPersister;
    private CustomUploaderHelper $uploaderHelper;
    private $entityManager;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        CustomUploaderHelper $uploaderHelper,
        EntityManagerInterface $entityManager
    )
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->uploaderHelper = $uploaderHelper;
        $this->entityManager = $entityManager;
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
        dump($context);
        if(!($context['item_opeartion_name'] ?? null) === 'put'){
            //Estoy updateando el servicio y aqui puedo crear una traza de que el servicio ha sido modificado
            //Si lo que se esta updateando es la imagen entonces no existe y por lo tanto no tiene ID
            if(!$data->getServiceImages()){
                $this->createNewUploadedFile($data);
            }
            //$this->logger->info(sprintf('Usuario %s esta siendo actualizado', $data->getId()));
        }else{
            //Si estoy creando el servicio creo el MediaObject nuevo
            $this->createNewUploadedFile($data);
        }

        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }

    /**
     * @param Servicio $data
     * @return Response
     */
    private function createNewUploadedFile($data)
    {
        foreach ($data->getServiceImages() as $serviceImage){
            $tmpPath = sys_get_temp_dir().'/service_upload_'.uniqid();
            file_put_contents($tmpPath, $serviceImage->getDecodedData());
            $uploadedFile = new File($tmpPath);

            dump($uploadedFile);
            $mediaObject = new MediaObject();
            $mediaObject->setFile($uploadedFile);
            $mediaObject->setUpdatedAt(new \DateTime());
            $mediaObject->setFilePath(
                $this->uploaderHelper->uploadServiceImage($uploadedFile, null)
            );
            dump($mediaObject);
            $this->entityManager->persist($mediaObject);
            if(!$uploadedFile){
                return new Response('El campo filename no debe estar vacio', 400);
            }

            $serviceImage->setFile($uploadedFile);
            $serviceImage->setFilePath(
                $this->uploaderHelper->uploadServiceImage($uploadedFile, $serviceImage->getFile())
            );
        }
        $this->entityManager->flush();
    }
}