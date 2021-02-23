<?php


namespace App\Commands;

use App\Entity\Notification;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ChangeNotificationToReadedCommand extends Command
{
    protected static $defaultName = 'app:change-notification-to-readed';
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        parent::__construct();
    }
    protected function configure()
    {
        $this
            ->setDescription('Cambia el estado de las notificaciones pendientes a Leidas')
            ->setHelp('Este comando busca todas las notificaciones pendientes a marcar como leidas y ejecuta el cambio');
    }
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln([
            '==============================================',
            '|  Cambio de estado Notificaciones a leidas  |',
            '==============================================',
            '',
        ]);

        $notificationsRepository = $this->entityManager->getRepository(Notification::class);

        $arrayOfNotifications = $notificationsRepository->findByToMarkAsReaded(true);

        if($arrayOfNotifications === []){
            $output->writeln("No hay notificaciones para cambiar");
        }else {
            /**
             * @var Notification $notification
             */
            foreach ($arrayOfNotifications as $notification) {
                $output->writeln("Cambiando notificacion: ".$notification->getId());
                $notification->setToMarkAsReaded(false);
                $notification->setReaded(true);
            }

            $this->entityManager->flush();
            $output->writeln('Notificaciones modificadas satisfactoriamente!');
        }
        return Command::SUCCESS;
    }
}