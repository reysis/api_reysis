<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200818231248 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE servicio (id INT AUTO_INCREMENT NOT NULL, no_servicio VARCHAR(100) NOT NULL, fecha_inicio DATETIME NOT NULL, total_hora_trabajada INT NOT NULL, fecha_terminacion DATETIME DEFAULT NULL, fecha_entrega DATETIME DEFAULT NULL, costo DOUBLE PRECISION DEFAULT NULL, estado VARCHAR(20) NOT NULL, defecto VARCHAR(255) DEFAULT NULL, ft TINYINT(1) DEFAULT NULL, descripcion LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tipos_servicios (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, descripcion LONGTEXT NOT NULL, image LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE servicio');
        $this->addSql('DROP TABLE tipos_servicios');
    }
}
