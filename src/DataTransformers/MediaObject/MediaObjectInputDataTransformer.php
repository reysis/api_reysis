<?php


namespace App\DataTransformers\MediaObject;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\DTO\MediaObject\MediaObjectInput;
use App\Entity\MediaObject;
use App\Services\CustomUploaderHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Response;

class MediaObjectInputDataTransformer implements DataTransformerInterface
{
    private CustomUploaderHelper $uploaderHelper;
    private EntityManagerInterface $entityManager;

    public function __construct(CustomUploaderHelper $uploaderHelper, EntityManagerInterface $entityManager)
    {
        $this->uploaderHelper = $uploaderHelper;
        $this->entityManager = $entityManager;
    }


    /**
     * {@inheritdoc}
     * @param MediaObjectInput $mediaObjectInput
     * @param string $to
     * @param array $context
     * @return MediaObject|object|Response
     * @throws \Exception
     */
    public function transform($mediaObjectInput, string $to, array $context = [])
    {
        $tmpPath = sys_get_temp_dir().'/sf_upload'.uniqid();
        file_put_contents($tmpPath, $mediaObjectInput->getDecodedData());
        $uploadedFile = new File($tmpPath);

        if(!$uploadedFile){
            return new Response('El campo file no debe estar vacio', 400);
        }

        $mediaObject =  new MediaObject();
        $mediaObject->setFile($uploadedFile);
        $mediaObject->setFilePath(
            $this->uploaderHelper->uploadImage($uploadedFile, null, 'public_images')
        );
        $mediaObject->setUpdatedAt($mediaObjectInput->getUpdatedAt());

        return $mediaObject;
    }

    /**
     * {@inheritdoc}
     * @param array|object $data
     * @param string $to
     * @param array $context
     * @return bool
     */
    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        if($data instanceof MediaObject){
            //Already transformed
            return false;
        }
        return MediaObject::class === $to && null !== ($context['input']['class'] ?? null);
    }
}