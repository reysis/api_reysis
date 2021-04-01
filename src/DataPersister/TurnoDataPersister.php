<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\AvailableDate;
use App\Entity\Turno;
use App\Entity\TurnoDisponible;
use App\Entity\User;
use App\Repository\AvailableDateRepository;
use App\Repository\TurnoDisponibleRepository;
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
    private EntityManagerInterface $entityManager;
    private MailerInterface $mailer;
    private TurnoDisponibleRepository $turnoDisponibleRepository;

    public function __construct(
        DataPersisterInterface $decoratedDataPersister,
        UserPasswordEncoderInterface $userPasswordEncoder,
        LoggerInterface $logger,
        TurnoDisponibleRepository $turnoDisponibleRepository,
        EntityManagerInterface $entityManager,
        MailerInterface $mailer
    )
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->logger = $logger;
        $this->entityManager = $entityManager;
        $this->mailer = $mailer;
        $this->turnoDisponibleRepository = $turnoDisponibleRepository;
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
        dump($data, $context);
        if(($context['collection_operation_name'] ?? null) === 'post'){
            $this->decrementAvailableTurno(
                $data->getDetalles()
            );
            $this->sendAppointmentConfirmationMail($data, $context);
        }
        if(($context['item_operation_name'] ?? null) == 'put'){
            /**
             * @var Turno $oldObject
             */
            $oldObject = $this->entityManager
                ->getUnitOfWork()
                ->getOriginalEntityData($data);

            if($oldObject['detalles'] !== $data->getDetalles()){
                $this->decrementAvailableTurno($data->getDetalles());
                /**
                 * @var TurnoDisponible $turnoDisponibleBeforeUpdate
                 */
                $turnoDisponibleBeforeUpdate = $this->turnoDisponibleRepository->findById($oldObject['detalles']->getId());
                if(!$turnoDisponibleBeforeUpdate){
                    $newTurnoAvailable = new TurnoDisponible();
                    $newTurnoAvailable->setOriginalAmount(1);
                    $newTurnoAvailable->setAmountAvailable(1);
                    $newTurnoAvailable->setDate($oldObject['detalles']->getDate());
                    $this->entityManager->persist($newTurnoAvailable);
                    $this->entityManager->flush();
                }else{
                    $this->incrementAvailableTurno($oldObject['fecha']);
                }
            }
        }
        dump($data);
        $this->decoratedDataPersister->persist($data);
    }

    /**
     * @param Turno $data
     * @param array $context
     */
    public function remove($data, array $context = [])
    {
        $this->incrementAvailableTurno($data->getDetalles());
        $this->decoratedDataPersister->remove($data);
    }

    private function decrementAvailableTurno(TurnoDisponible $turnoDisponible)
    {
        if($turnoDisponible->getAmountAvailable() === 1){
            $this->entityManager->remove($turnoDisponible);
        }else {
            $turnoDisponible->setAmountAvailable($turnoDisponible->getAmountAvailable() - 1);
        }
        $this->entityManager->flush();
    }

    private function incrementAvailableTurno(TurnoDisponible $turnoDisponible)
    {
        $turnoDisponible->setAmountAvailable($turnoDisponible->getAmountAvailable() + 1);
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