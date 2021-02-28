<?php


namespace App\Doctrine;

use App\Entity\Reviews;
use App\Repository\LikeReviewRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class SetLikededOnReviewListener
{
    private Security $security;
    private LikeReviewRepository $likeReviewRepository;

    public function __construct(
        LikeReviewRepository $likeReviewRepository,
        Security $security
    )
    {
        $this->security = $security;
        $this->likeReviewRepository = $likeReviewRepository;
    }

    public function postLoad(Reviews $reviews)
    {
        $user = $this->security->getUser();
        if($user){
            /**
             * @var Reviews[] $liked
             */
            $liked = $this->likeReviewRepository->findOneLiked($reviews->getId(), $user->getId());
            if($liked != []){
                $reviews->setLikedByMe(true);
            }
        }
    }
}