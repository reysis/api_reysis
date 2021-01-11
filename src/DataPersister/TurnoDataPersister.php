<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Turno;
use App\Entity\User;
use App\Repository\AvailableDateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class TurnoDataPersister implements ContextAwareDataPersisterInterface
{
    private $decoratedDataPersister;
    private $userPasswordEncoder;
    private $logger;
    private AvailableDateRepository $availableDateRepository;
    private EntityManagerInterface $entityManager;
    private \Swift_Mailer $mailer;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        UserPasswordEncoderInterface $userPasswordEncoder,
        LoggerInterface $logger,
        AvailableDateRepository $availableDateRepository,
        EntityManagerInterface $entityManager,
        \Swift_Mailer $mailer
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
        if(($context['collection_operation_name'] ?? null) === 'post' ||
            ($context['item_operation_name'] ?? null) === 'put'
        ){
            $this->decrementAvailableTurno($data->getFecha());
            $this->sendAppointmentConfirmationMail($data, $context);
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
        $availableDate->setAmountAvailable($availableDate->getAmountAvailable() - 1);
        $this->entityManager->persist($availableDate);
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
     */
    private function sendAppointmentConfirmationMail($turno, $context)
    {
        if(($context['collection_operation_name'] ?? null) === 'post') {
            $message = (new \Swift_Message('Cita confirmada!'))
                ->setFrom('admin@reysis.com')
                ->setTo($turno->getUser()->getEmail())
                ->setBody(sprintf('Su reservación para %s ha sido confirmada', $turno->getFecha()->format('Y-m-d H:i:s')));
        }else if(($context['item_operation_name'] ?? null) === 'put'){
            $message = (new \Swift_Message('Cita reprogramada!'))
                ->setFrom('admin@reysis.com')
                ->setTo($turno->getUser()->getEmail())
                ->setBody(sprintf('Su reservación ha sido reprogramada para %s', $turno->getFecha()->format('Y-m-d H:i:s')));
        }
        $this->mailer->send($message);
    }
}