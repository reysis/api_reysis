<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200821185252 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE roles_object (id INT AUTO_INCREMENT NOT NULL, role_name VARCHAR(50) NOT NULL, descripcion VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_438A9E8DE09C0C92 (role_name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_roles_object (user_id INT NOT NULL, roles_object_id INT NOT NULL, INDEX IDX_C346E28FA76ED395 (user_id), INDEX IDX_C346E28F6D03800A (roles_object_id), PRIMARY KEY(user_id, roles_object_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_roles_object ADD CONSTRAINT FK_C346E28FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_roles_object ADD CONSTRAINT FK_C346E28F6D03800A FOREIGN KEY (roles_object_id) REFERENCES roles_object (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_roles_object DROP FOREIGN KEY FK_C346E28F6D03800A');
        $this->addSql('DROP TABLE roles_object');
        $this->addSql('DROP TABLE user_roles_object');
    }
}
