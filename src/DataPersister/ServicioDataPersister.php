<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\MediaObject;
use App\Entity\Servicio;
use App\Services\CustomUploaderHelper;

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
        if(($context['item_opeartion_name'] ?? null) === 'put'){
            //Aqui puedo crear una traza de que el servicio ha sido modificado

            $this->logger->info(sprintf('Usuario %s esta siendo actualizado', $data->getId()));
        }
        $data->setUpdatedAt(new \DateTime());

        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }
}