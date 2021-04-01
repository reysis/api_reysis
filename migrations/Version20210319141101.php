<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210319141101 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE taller_brinda_servicio (id INT AUTO_INCREMENT NOT NULL, servicio_id INT NOT NULL, taller_id INT NOT NULL, INDEX IDX_15FBE8C871CAA3E7 (servicio_id), INDEX IDX_15FBE8C86DC343EA (taller_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE taller_brinda_servicio ADD CONSTRAINT FK_15FBE8C871CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicio (id)');
        $this->addSql('ALTER TABLE taller_brinda_servicio ADD CONSTRAINT FK_15FBE8C86DC343EA FOREIGN KEY (taller_id) REFERENCES taller (id)');
        $this->addSql('ALTER TABLE taller ADD address_id INT NOT NULL, ADD alias VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE taller ADD CONSTRAINT FK_139F4584F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_139F4584F5B7AF75 ON taller (address_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE taller_brinda_servicio');
        $this->addSql('ALTER TABLE taller DROP FOREIGN KEY FK_139F4584F5B7AF75');
        $this->addSql('DROP INDEX UNIQ_139F4584F5B7AF75 ON taller');
        $this->addSql('ALTER TABLE taller DROP address_id, DROP alias');
    }
}
