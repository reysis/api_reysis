<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210331232022 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno_disponible DROP FOREIGN KEY FK_5C951CC433C11D3E');
        $this->addSql('DROP INDEX IDX_5C951CC433C11D3E ON turno_disponible');
        $this->addSql('ALTER TABLE turno_disponible CHANGE available_date_id date_id INT NOT NULL');
        $this->addSql('ALTER TABLE turno_disponible ADD CONSTRAINT FK_5C951CC4B897366B FOREIGN KEY (date_id) REFERENCES available_date (id)');
        $this->addSql('CREATE INDEX IDX_5C951CC4B897366B ON turno_disponible (date_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno_disponible DROP FOREIGN KEY FK_5C951CC4B897366B');
        $this->addSql('DROP INDEX IDX_5C951CC4B897366B ON turno_disponible');
        $this->addSql('ALTER TABLE turno_disponible CHANGE date_id available_date_id INT NOT NULL');
        $this->addSql('ALTER TABLE turno_disponible ADD CONSTRAINT FK_5C951CC433C11D3E FOREIGN KEY (available_date_id) REFERENCES available_date (id)');
        $this->addSql('CREATE INDEX IDX_5C951CC433C11D3E ON turno_disponible (available_date_id)');
    }
}
