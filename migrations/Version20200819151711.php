<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200819151711 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE accesorios (id INT AUTO_INCREMENT NOT NULL, equipo_id INT DEFAULT NULL, nombre VARCHAR(255) NOT NULL, INDEX IDX_4262EE623BFBED (equipo_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE equipo (id INT AUTO_INCREMENT NOT NULL, tipo_equipo_id INT NOT NULL, marca_id INT NOT NULL, modelo VARCHAR(255) NOT NULL, numero_serie VARCHAR(255) NOT NULL, INDEX IDX_C49C530BE05544A3 (tipo_equipo_id), INDEX IDX_C49C530B81EF0041 (marca_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE marca (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tipo_equipo (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE accesorios ADD CONSTRAINT FK_4262EE623BFBED FOREIGN KEY (equipo_id) REFERENCES equipo (id)');
        $this->addSql('ALTER TABLE equipo ADD CONSTRAINT FK_C49C530BE05544A3 FOREIGN KEY (tipo_equipo_id) REFERENCES tipo_equipo (id)');
        $this->addSql('ALTER TABLE equipo ADD CONSTRAINT FK_C49C530B81EF0041 FOREIGN KEY (marca_id) REFERENCES marca (id)');
        $this->addSql('ALTER TABLE servicio ADD tipo_servicio_id INT NOT NULL, ADD equipo_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE servicio ADD CONSTRAINT FK_CB86F22A44EE8D1F FOREIGN KEY (tipo_servicio_id) REFERENCES tipos_servicios (id)');
        $this->addSql('ALTER TABLE servicio ADD CONSTRAINT FK_CB86F22A23BFBED FOREIGN KEY (equipo_id) REFERENCES equipo (id)');
        $this->addSql('CREATE INDEX IDX_CB86F22A44EE8D1F ON servicio (tipo_servicio_id)');
        $this->addSql('CREATE INDEX IDX_CB86F22A23BFBED ON servicio (equipo_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE accesorios DROP FOREIGN KEY FK_4262EE623BFBED');
        $this->addSql('ALTER TABLE servicio DROP FOREIGN KEY FK_CB86F22A23BFBED');
        $this->addSql('ALTER TABLE equipo DROP FOREIGN KEY FK_C49C530B81EF0041');
        $this->addSql('ALTER TABLE equipo DROP FOREIGN KEY FK_C49C530BE05544A3');
        $this->addSql('DROP TABLE accesorios');
        $this->addSql('DROP TABLE equipo');
        $this->addSql('DROP TABLE marca');
        $this->addSql('DROP TABLE tipo_equipo');
        $this->addSql('ALTER TABLE servicio DROP FOREIGN KEY FK_CB86F22A44EE8D1F');
        $this->addSql('DROP INDEX IDX_CB86F22A44EE8D1F ON servicio');
        $this->addSql('DROP INDEX IDX_CB86F22A23BFBED ON servicio');
        $this->addSql('ALTER TABLE servicio DROP tipo_servicio_id, DROP equipo_id');
    }
}
