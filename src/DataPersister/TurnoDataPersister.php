<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\AvailableDate;
use App\Entity\Turno;
use App\Entity\User;
use App\Repository\AvailableDateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Mime\Email;

class TurnoDataPersister implements ContextAwareDataPersisterInterface
{
    private $decoratedDataPersister;
    private $userPasswordEncoder;
    private $logger;
    private AvailableDateRepository $availableDateRepository;
    private EntityManagerInterface $entityManager;
    private MailerInterface $mailer;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        UserPasswordEncoderInterface $userPasswordEncoder,
        LoggerInterface $logger,
        AvailableDateRepository $availableDateRepository,
        EntityManagerInterface $entityManager,
        MailerInterface $mailer
    )
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->logger = $logger;
        $this->availableDateRepository = $availableDateRepository;
        $this->entityManager = $entityManager;
        $this->mailer = $mailer;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Turno;
    }
    /**
     * Persister
     *
     * @param Turno $data
     */
    public function persist($data, array $context = [])
    {
        if(($context['collection_operation_name'] ?? null) === 'post'){
            $this->decrementAvailableTurno($data->getFecha());
            $this->sendAppointmentConfirmationMail($data, $context);
        }
        if(($context['item_operation_name'] ?? null) == 'put'){
            $oldObject = $this->entityManager
                ->getUnitOfWork()
                ->getOriginalEntityData($data);

            if($oldObject['fecha'] !== $data->getFecha()){
                $this->decrementAvailableTurno($data->getFecha());
                /**
                 * @var AvailableDate $dateBeforeUpdate
                 */
                $dateBeforeUpdate = $this->availableDateRepository->findOneByDate($oldObject['fecha']);
                if(!$dateBeforeUpdate){
                    $newDateAvailable = new AvailableDate();
                    $newDateAvailable->setOriginalAmount(1);
                    $newDateAvailable->setAmountAvailable(1);
                    $newDateAvailable->setDate($oldObject['fecha']);
                    $this->entityManager->persist($newDateAvailable);
                    $this->entityManager->flush();
                }else{
                    $this->incrementAvailableTurno($oldObject['fecha']);
                }
            }
        }

        $this->decoratedDataPersister->persist($data);
    }

    /**
     * @param Turno $data
     * @param array $context
     */
    public function remove($data, array $context = [])
    {
        $this->incrementAvailableTurno($data->getFecha());
        $this->decoratedDataPersister->remove($data);
    }

    private function decrementAvailableTurno(\DateTimeInterface $date)
    {
        $availableDate = $this->availableDateRepository->findOneByDate($date);
        if($availableDate->getAmountAvailable() === 1){
            $this->entityManager->remove($availableDate);
        }else {
            $availableDate->setAmountAvailable($availableDate->getAmountAvailable() - 1);
            $this->entityManager->persist($availableDate);
        }
        $this->entityManager->flush();
    }

    private function incrementAvailableTurno(\DateTimeInterface $date)
    {
        $availableDate = $this->availableDateRepository->findOneByDate($date);
        $availableDate->setAmountAvailable($availableDate->getAmountAvailable() + 1);
        $this->entityManager->persist($availableDate);
        $this->entityManager->flush();
    }

    /**
     * @param Turno $turno
     * @ArrayCollection $context
     * @throws \Symfony\Component\Mailer\Exception\TransportExceptionInterface
     */
    private function sendAppointmentConfirmationMail($turno, $context)
    {
        $message = null;
        if(($context['collection_operation_name'] ?? null) === 'post') {
            $message = (new TemplatedEmail())
                ->from('admin@reysis.com')
                ->to($turno->getUser()->getEmail())
                ->htmlTemplate('emails/turno.html.twig');
        }else if(($context['item_operation_name'] ?? null) === 'put'){
            $message = (new TemplatedEmail())
                ->from('admin@reysis.com')
                ->to($turno->getUser()->getEmail())
                ->htmlTemplate('emails/re-turno.html.twig');
        }
        $this->mailer->send($message);
    }
}