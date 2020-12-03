<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\ContactMessage;
use Psr\Log\LoggerInterface;

class ContactMessageDataPersister implements ContextAwareDataPersisterInterface
{
    private DataPersisterInterface $decoratedDataPersister;
    private \Swift_Mailer $mailer;
    private LoggerInterface $logger;

    public function __construct(DataPersisterInterface $decoratedDataPersister, \Swift_Mailer $mailer, LoggerInterface $logger)
    {
        $this->decoratedDataPersister = $decoratedDataPersister;
        $this->mailer = $mailer;
        $this->logger = $logger;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof ContactMessage;
    }

    /**
     * @param ContactMessage $data
     */
    public function persist($data, array $context = [])
    {
        $this->logger->info(sprintf('Se esta Persistiendo el usuario'));

        if(!$data->getId()){
            $mensaje = (new \Swift_Message('Usuario se ha puesto en contacto'))
                        ->setFrom($data->getFromEmail())
                        ->setTo('admin@reysis.com')
                        ->setBody(
                            $data->getMessage()
                        );
            $this->mailer->send($mensaje);

            $this->logger->info(sprintf('Se ha enviado el correo satisfactoriamente!'));
            $data->setDateSent(new \DateTime());
        }
        $this->decoratedDataPersister->persist($data);
    }

    public function remove($data, array $context = [])
    {
        $this->decoratedDataPersister->remove($data);
    }
}