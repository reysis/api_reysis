<?php


namespace App\Doctrine;


use App\Entity\MediaObject;
use App\Services\CustomUploaderHelper;

class SetContentUrlOnMediaObjectListener
{
    private CustomUploaderHelper $customUploaderHelper;

    public function __construct(CustomUploaderHelper $customUploaderHelper)
    {
        $this->customUploaderHelper = $customUploaderHelper;
    }

    public function postLoad(MediaObject $mediaObject)
    {
        if($mediaObject->getFilePath())
            $mediaObject->setContentUrl($this->customUploaderHelper->getPublicPath($mediaObject->getFilePath()));
    }
}