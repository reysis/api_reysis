<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210411140543 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE equipo_servicio (id INT AUTO_INCREMENT NOT NULL, servicio_id INT NOT NULL, equipo_id INT NOT NULL, INDEX IDX_1EAB9D5871CAA3E7 (servicio_id), INDEX IDX_1EAB9D5823BFBED (equipo_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE equipo_servicio ADD CONSTRAINT FK_1EAB9D5871CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicio (id)');
        $this->addSql('ALTER TABLE equipo_servicio ADD CONSTRAINT FK_1EAB9D5823BFBED FOREIGN KEY (equipo_id) REFERENCES equipo (id)');
        $this->addSql('DROP TABLE servicio_equipo');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_139F4584E16C6B94 ON taller (alias)');
        $this->addSql('ALTER TABLE taller_brinda_servicio ADD CONSTRAINT FK_15FBE8C818DFB150 FOREIGN KEY (servicio_aequipo_id) REFERENCES equipo_servicio (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE taller_brinda_servicio DROP FOREIGN KEY FK_15FBE8C818DFB150');
        $this->addSql('CREATE TABLE servicio_equipo (id INT AUTO_INCREMENT NOT NULL, servicio_id INT NOT NULL, equipo_id INT NOT NULL, UNIQUE INDEX servicio_equipo_unique (servicio_id, equipo_id), INDEX IDX_91D2467D23BFBED (equipo_id), INDEX IDX_91D2467D71CAA3E7 (servicio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE servicio_equipo ADD CONSTRAINT FK_91D2467D23BFBED FOREIGN KEY (equipo_id) REFERENCES equipo (id)');
        $this->addSql('ALTER TABLE servicio_equipo ADD CONSTRAINT FK_91D2467D71CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicio (id)');
        $this->addSql('DROP TABLE equipo_servicio');
        $this->addSql('DROP INDEX UNIQ_139F4584E16C6B94 ON taller');
    }
}
