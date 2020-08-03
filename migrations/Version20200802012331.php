<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200802012331 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno ADD persona_citada_id INT NOT NULL');
        $this->addSql('ALTER TABLE turno ADD CONSTRAINT FK_E7976762E0DFC543 FOREIGN KEY (persona_citada_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_E7976762E0DFC543 ON turno (persona_citada_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno DROP FOREIGN KEY FK_E7976762E0DFC543');
        $this->addSql('DROP INDEX IDX_E7976762E0DFC543 ON turno');
        $this->addSql('ALTER TABLE turno DROP persona_citada_id');
    }
}
