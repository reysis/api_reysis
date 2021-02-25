<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210223200139 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE estadistica ADD name VARCHAR(255) NOT NULL, ADD value DOUBLE PRECISION NOT NULL, DROP media_rating, DROP years_of_experience, DROP fixed_equips');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE estadistica ADD media_rating DOUBLE PRECISION DEFAULT NULL, ADD years_of_experience INT DEFAULT NULL, ADD fixed_equips INT DEFAULT NULL, DROP name, DROP value');
    }
}
