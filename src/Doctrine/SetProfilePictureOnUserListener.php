<?php


namespace App\Doctrine;


use App\Entity\User;
use App\Services\CustomUploaderHelper;

class SetProfilePictureOnUserListener
{
    private CustomUploaderHelper $customUploaderHelper;

    public function __construct(CustomUploaderHelper $customUploaderHelper)
    {
        $this->customUploaderHelper = $customUploaderHelper;
    }

    public function postLoad(User $user)
    {
        $uri = $this->customUploaderHelper->getPublicPath($user->getProfilePicture()->getFilePath());
        $user->getProfilePicture()->setContentUrl($uri);
    }
}