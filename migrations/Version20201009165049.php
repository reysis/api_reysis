<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201009165049 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tipos_servicios ADD image_id INT DEFAULT NULL, DROP image');
        $this->addSql('ALTER TABLE tipos_servicios ADD CONSTRAINT FK_90E23E0A3DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id)');
        $this->addSql('CREATE INDEX IDX_90E23E0A3DA5256D ON tipos_servicios (image_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tipos_servicios DROP FOREIGN KEY FK_90E23E0A3DA5256D');
        $this->addSql('DROP INDEX IDX_90E23E0A3DA5256D ON tipos_servicios');
        $this->addSql('ALTER TABLE tipos_servicios ADD image LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP image_id');
    }
}
