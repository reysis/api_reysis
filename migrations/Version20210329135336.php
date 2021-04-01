<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210329135336 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE available_date ADD dia INT NOT NULL, ADD mes INT NOT NULL, ADD year INT NOT NULL, ADD hora INT NOT NULL, ADD minutos INT NOT NULL, DROP date, DROP amount_available, DROP original_amount');
        $this->addSql('ALTER TABLE turno_disponible ADD amount_available INT NOT NULL, ADD original_amount INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE available_date ADD date DATETIME NOT NULL, ADD amount_available INT NOT NULL, ADD original_amount INT NOT NULL, DROP dia, DROP mes, DROP year, DROP hora, DROP minutos');
        $this->addSql('ALTER TABLE turno_disponible DROP amount_available, DROP original_amount');
    }
}
