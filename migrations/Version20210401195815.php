<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210401195815 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C49C530B3A909126 ON equipo (nombre)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CB86F22A3A909126 ON servicio (nombre)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_C49C530B3A909126 ON equipo');
        $this->addSql('DROP INDEX UNIQ_CB86F22A3A909126 ON servicio');
    }
}
