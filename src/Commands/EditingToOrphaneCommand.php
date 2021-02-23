<?php


namespace App\Commands;


use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class EditingToOrphaneCommand extends Command
{
    protected static $defaultName = 'app:change-editing-to-orphane';
    private EntityManagerInterface $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager
    )
    {
        $this->entityManager = $entityManager;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setDescription('Cambia el estado de las imagenes de editing a orphane')
            ->setHelp('Este comando cambia el estado de las imagenes de editing a orphane de las imagenes que lleven mas de un dia de creadas y aun tengan el estado de editing en true que haya al momento de su ejecucion');
    }
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln([
            '================================================',
            '|  Cambio de imagenes de editando a huerfanas  |',
            '================================================',
            '',
        ]);
        $today = new \DateTime('now');
        //resto un dia a la fecha actual
        $today->sub(new \DateInterval('PT24H'));

        $mediaObjectRepository = $this->entityManager->getRepository(MediaObject::class);

        $editingImages = $mediaObjectRepository->findByOldEditing(true, $today);

        if($editingImages === []){
            $output->writeln('No hay imagenes huerfanas para eliminar');
        }else {
            /**
             * @var MediaObject $image
             */
            foreach ($editingImages as $image) {
                $output->writeln('Modificando imagen: ' . $image->getFilePath() . '...');
                $image->setEditing(false);
                $image->setOrphane(true);
            }
            $this->entityManager->flush();
            $output->writeln('Imagenes modificadas satisfactoriamente!');
        }
        return Command::SUCCESS;
    }
}