<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210329050639 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE taller_brinda_servicio DROP FOREIGN KEY FK_15FBE8C871CAA3E7');
        $this->addSql('DROP INDEX IDX_15FBE8C871CAA3E7 ON taller_brinda_servicio');
        $this->addSql('ALTER TABLE taller_brinda_servicio CHANGE servicio_id servicio_aequipo_id INT NOT NULL');
        $this->addSql('ALTER TABLE taller_brinda_servicio ADD CONSTRAINT FK_15FBE8C818DFB150 FOREIGN KEY (servicio_aequipo_id) REFERENCES equipo_servicio (id)');
        $this->addSql('CREATE INDEX IDX_15FBE8C818DFB150 ON taller_brinda_servicio (servicio_aequipo_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE taller_brinda_servicio DROP FOREIGN KEY FK_15FBE8C818DFB150');
        $this->addSql('DROP INDEX IDX_15FBE8C818DFB150 ON taller_brinda_servicio');
        $this->addSql('ALTER TABLE taller_brinda_servicio CHANGE servicio_aequipo_id servicio_id INT NOT NULL');
        $this->addSql('ALTER TABLE taller_brinda_servicio ADD CONSTRAINT FK_15FBE8C871CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicio (id)');
        $this->addSql('CREATE INDEX IDX_15FBE8C871CAA3E7 ON taller_brinda_servicio (servicio_id)');
    }
}
