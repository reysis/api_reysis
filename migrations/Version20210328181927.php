<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210328181927 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE equipo (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE equipo_servicio (id INT AUTO_INCREMENT NOT NULL, servicio_id INT NOT NULL, equipo_id INT NOT NULL, INDEX IDX_1EAB9D5871CAA3E7 (servicio_id), INDEX IDX_1EAB9D5823BFBED (equipo_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE turno_disponible (id INT AUTO_INCREMENT NOT NULL, servicio_taller_id INT NOT NULL, available_date_id INT NOT NULL, INDEX IDX_5C951CC49B6EDDDE (servicio_taller_id), INDEX IDX_5C951CC433C11D3E (available_date_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE equipo_servicio ADD CONSTRAINT FK_1EAB9D5871CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicio (id)');
        $this->addSql('ALTER TABLE equipo_servicio ADD CONSTRAINT FK_1EAB9D5823BFBED FOREIGN KEY (equipo_id) REFERENCES equipo (id)');
        $this->addSql('ALTER TABLE turno_disponible ADD CONSTRAINT FK_5C951CC49B6EDDDE FOREIGN KEY (servicio_taller_id) REFERENCES taller_brinda_servicio (id)');
        $this->addSql('ALTER TABLE turno_disponible ADD CONSTRAINT FK_5C951CC433C11D3E FOREIGN KEY (available_date_id) REFERENCES available_date (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE equipo_servicio DROP FOREIGN KEY FK_1EAB9D5823BFBED');
        $this->addSql('DROP TABLE equipo');
        $this->addSql('DROP TABLE equipo_servicio');
        $this->addSql('DROP TABLE turno_disponible');
    }
}
