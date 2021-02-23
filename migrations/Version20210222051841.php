<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210222051841 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE voted_by (id INT AUTO_INCREMENT NOT NULL, id_review_id INT NOT NULL, id_user_id INT NOT NULL, INDEX IDX_1E3405FCBE1B2ABC (id_review_id), INDEX IDX_1E3405FC79F37AE5 (id_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE voted_by ADD CONSTRAINT FK_1E3405FCBE1B2ABC FOREIGN KEY (id_review_id) REFERENCES reviews (id)');
        $this->addSql('ALTER TABLE voted_by ADD CONSTRAINT FK_1E3405FC79F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE voted_by');
    }
}
