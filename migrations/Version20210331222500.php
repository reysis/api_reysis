<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210331222500 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno ADD detalles_id INT NOT NULL, DROP fecha');
        $this->addSql('ALTER TABLE turno ADD CONSTRAINT FK_E79767628F32AB43 FOREIGN KEY (detalles_id) REFERENCES turno_disponible (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E79767628F32AB43 ON turno (detalles_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno DROP FOREIGN KEY FK_E79767628F32AB43');
        $this->addSql('DROP INDEX UNIQ_E79767628F32AB43 ON turno');
        $this->addSql('ALTER TABLE turno ADD fecha DATETIME NOT NULL, DROP detalles_id');
    }
}
