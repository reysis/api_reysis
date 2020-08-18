<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200804151434 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE tipo_usuario (id INT AUTO_INCREMENT NOT NULL, tipo VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD tipo_usuario_id INT NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6494ABE41B6 FOREIGN KEY (tipo_usuario_id) REFERENCES tipo_usuario (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6494ABE41B6 ON user (tipo_usuario_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6494ABE41B6');
        $this->addSql('DROP TABLE tipo_usuario');
        $this->addSql('DROP INDEX IDX_8D93D6494ABE41B6 ON user');
        $this->addSql('ALTER TABLE user DROP tipo_usuario_id');
    }
}
