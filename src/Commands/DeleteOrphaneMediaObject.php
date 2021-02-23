<?php


namespace App\Commands;

use App\Entity\MediaObject;
use App\Services\CustomUploaderHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class DeleteOrphaneMediaObject extends Command
{
    protected static $defaultName = 'app:delete-orphane-image';

    private EntityManagerInterface $entityManager;
    /**
     * @var CustomUploaderHelper
     */
    private CustomUploaderHelper $customUploaderHelper;

    public function __construct(
        EntityManagerInterface $entityManager,
        CustomUploaderHelper $customUploaderHelper
    )
    {
        $this->entityManager = $entityManager;
        $this->customUploaderHelper = $customUploaderHelper;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setDescription('Elimina todas las imagenes huerfanas')
            ->setHelp('Este comando permite eliminar todas las imagenes huerfanas que haya al momento de su ejecucion');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln([
            '======================================',
            '|  Recolector de imagenes huerfanas  |',
            '======================================',
            '',
        ]);
        $mediaObjectRepository = $this->entityManager->getRepository(MediaObject::class);

        $orphanesArray = $mediaObjectRepository->findByOrphane(true);

        if($orphanesArray === []){
            $output->writeln('No hay imagenes huerfanas para eliminar');
        }else {
            /**
             * @var MediaObject $orphaneMediaObject
             */
            foreach ($orphanesArray as $orphaneMediaObject) {
                $pathSplited = explode('/', $orphaneMediaObject->getFilePath());
                $this->customUploaderHelper->removeIfExistPublic($pathSplited[1], $pathSplited[0]);
                $output->writeln('Eliminando imagen: ' . $orphaneMediaObject->getFilePath() . '...');
                $this->entityManager->remove($orphaneMediaObject);
            }
            $this->entityManager->flush();

            $output->writeln('Imagenes eliminadas satisfactoriamente! :)');
        }
        return Command::SUCCESS;
    }
}