<?php

namespace App\DataPersister;

use ApiPlatform\Core\Bridge\Doctrine\Common\DataPersister;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use App\Services\CustomUploaderHelper;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class UserDataPersister implements ContextAwareDataPersisterInterface
{
    private $userPasswordEncoder;
    private $security;
    private $logger;
    private $decoratedDataPersister;
    private CustomUploaderHelper $uploaderHelper;
    private $entityManager;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        UserPasswordEncoderInterface $userPasswordEncoder,
        LoggerInterface $logger,
        Security $security,
        CustomUploaderHelper $uploaderHelper,
        EntityManagerInterface $entityManager)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->security = $security;
        $this->logger = $logger;
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->uploaderHelper = $uploaderHelper;
        $this->entityManager = $entityManager;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * Persister
     *
     * @param User $data
     */
    public function persist($data, array $context = [])
    {
        //dump($data);
        if(($context['item_operation_name'] ?? null) === 'put'){
            $this->logger->info(sprintf('Usuario %s esta siendo actualizado', $data->getId()));
            if($data->getProfilePicture()->getFilename() !== "" && $data->getProfilePicture()->getData() !== ""){
                $tmpPath = sys_get_temp_dir().'/user_profilePic_'.uniqid();
                file_put_contents($tmpPath, $data->getProfilePicture()->getDecodedData());
                $uploadedFile = new File($tmpPath);

                if(!$uploadedFile){
                    return new Response('El campo filename no debe estar vacio', 400);
                }
                $data->getProfilePicture()->setFilePath(
                    "user_images/".$this->uploaderHelper->uploadUserImage($uploadedFile, $data->getProfilePicture()->getFilePath())
                );
                $data->getProfilePicture()->setFile($uploadedFile);
            }
        }else{
            //$this->createNewUploadedFile($data);
            //Aqui se puede hacer cualquier cosa con el usuario
            //Como mandar un email de confirmacion o un mensaje
            //O añadirlo a cualquier sistema de pago
            $this->logger->info(sprintf('Usuario $s se acaba de registrar', $data->getId()));
            $data->getPersona()->setUser( $data );
        }
        if($data->getPlainPassword()){
            $data->setPassword(
                $this->userPasswordEncoder->encodePassword($data,$data->getPlainPassword())
            );
            $data->eraseCredentials();
        }
        $this->decoratedDataPersister->persist($data);
    }
    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }

    /**
     * @param User $data
     * @return Response
     */
    private function createNewUploadedFile($data)
    {
        $tmpPath = sys_get_temp_dir().'/user_profilePic_'.uniqid();
        file_put_contents($tmpPath, $data->getProfilePicture()->getDecodedData());
        $uploadedFile = new File($tmpPath);

        if(!$uploadedFile){
            return new Response('El campo filename no debe estar vacio', 400);
        }

        $data->getProfilePicture()->setFile($uploadedFile);
        $data->getProfilePicture()->setFilePath(
            'user_images/'.$this->uploaderHelper->uploadUserImage($uploadedFile, $data->getProfilePicture()->getFile())
        );
    }
}