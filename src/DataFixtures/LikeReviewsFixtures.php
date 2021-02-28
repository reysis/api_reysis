<?php


namespace App\DataFixtures;


use App\Entity\LikeReview;
use App\Entity\Reviews;
use App\Entity\User;
use App\Repository\ReviewsRepository;
use App\Repository\UserRepository;
use Cassandra\Set;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class LikeReviewsFixtures extends BaseFixture implements DependentFixtureInterface
{
    private ReviewsRepository $reviewsRepository;
    private UserRepository $userRepository;

    public function __construct(ReviewsRepository $reviewsRepository, UserRepository $userRepository)
    {
        $this->reviewsRepository = $reviewsRepository;
        $this->userRepository = $userRepository;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(200, 'LIKE_REVIEW', function ($i) use ($manager){
            $likeReview = new LikeReview();
            /**
             * @var Reviews $Review
             */
            $Review = $this->getReference(sprintf('reviews_%d_REFERENCE', $i));
            $Review->setLikes($Review->getLikes() + 10);
            $likeReview->setIdReview($Review);
            for($j = 0; $j < 10; $j++){
                $likeReview->setIdUser($this->getReference(sprintf('normal_users_%d_REFERENCE', $j)));
            }
            return $likeReview;
        });

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
            ReviewFixtures::class
        ];
    }
}