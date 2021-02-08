<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210203152134 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE address (id INT AUTO_INCREMENT NOT NULL, post_address VARCHAR(100) NOT NULL, indications VARCHAR(100) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE available_date (id INT AUTO_INCREMENT NOT NULL, date DATETIME NOT NULL, amount_available INT NOT NULL, original_amount INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE configurations (id INT AUTO_INCREMENT NOT NULL, domicilio TINYINT(1) NOT NULL, mision LONGTEXT NOT NULL, vision LONGTEXT NOT NULL, slogan VARCHAR(255) NOT NULL, footer_phrase VARCHAR(255) NOT NULL, who_we_are LONGTEXT NOT NULL, what_we_do LONGTEXT NOT NULL, terms_and_condition LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact_message (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, from_email VARCHAR(255) DEFAULT NULL, contact_phone VARCHAR(255) NOT NULL, message LONGTEXT NOT NULL, date_sent DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE faq (id INT AUTO_INCREMENT NOT NULL, question VARCHAR(255) NOT NULL, answer LONGTEXT NOT NULL, category VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media_object (id INT AUTO_INCREMENT NOT NULL, servicio_id INT DEFAULT NULL, file_path VARCHAR(255) DEFAULT NULL, updated_at DATETIME NOT NULL, INDEX IDX_14D4313271CAA3E7 (servicio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, date DATETIME NOT NULL, description VARCHAR(255) NOT NULL, readed TINYINT(1) NOT NULL, INDEX IDX_BF5476CAA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE persona (id INT AUTO_INCREMENT NOT NULL, ci VARCHAR(11) NOT NULL, nombre VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE phone_number (id INT AUTO_INCREMENT NOT NULL, phone_type VARCHAR(50) NOT NULL, number VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE refresh_tokens (id INT AUTO_INCREMENT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid DATETIME NOT NULL, UNIQUE INDEX UNIQ_9BACE7E1C74F2195 (refresh_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reviews (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, review_text LONGTEXT NOT NULL, date_published DATETIME NOT NULL, likes INT NOT NULL, stars INT NOT NULL, is_public TINYINT(1) NOT NULL, INDEX IDX_6970EB0FA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE servicio (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, descripcion LONGTEXT NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE social_media (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, facebook VARCHAR(255) DEFAULT NULL, linkedin VARCHAR(255) DEFAULT NULL, twitter VARCHAR(255) DEFAULT NULL, youtube VARCHAR(255) DEFAULT NULL, telegram VARCHAR(255) DEFAULT NULL, INDEX IDX_20BC159EA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE turno (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, fecha DATETIME NOT NULL, defecto VARCHAR(255) NOT NULL, INDEX IDX_E7976762A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, address_id INT NOT NULL, profile_picture_id INT DEFAULT NULL, persona_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, date_registered DATETIME DEFAULT NULL, last_edited DATETIME DEFAULT NULL, last_loggued DATETIME DEFAULT NULL, nationality VARCHAR(255) NOT NULL, is_public TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), INDEX IDX_8D93D649F5B7AF75 (address_id), UNIQUE INDEX UNIQ_8D93D649292E8AE2 (profile_picture_id), UNIQUE INDEX UNIQ_8D93D649F5F88DB9 (persona_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users_phonenumbers (user_id INT NOT NULL, phonenumber_id INT NOT NULL, INDEX IDX_2078A879A76ED395 (user_id), UNIQUE INDEX UNIQ_2078A879D626887C (phonenumber_id), PRIMARY KEY(user_id, phonenumber_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE media_object ADD CONSTRAINT FK_14D4313271CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicio (id)');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE reviews ADD CONSTRAINT FK_6970EB0FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE social_media ADD CONSTRAINT FK_20BC159EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE turno ADD CONSTRAINT FK_E7976762A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649292E8AE2 FOREIGN KEY (profile_picture_id) REFERENCES media_object (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649F5F88DB9 FOREIGN KEY (persona_id) REFERENCES persona (id)');
        $this->addSql('ALTER TABLE users_phonenumbers ADD CONSTRAINT FK_2078A879A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE users_phonenumbers ADD CONSTRAINT FK_2078A879D626887C FOREIGN KEY (phonenumber_id) REFERENCES phone_number (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649F5B7AF75');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649292E8AE2');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649F5F88DB9');
        $this->addSql('ALTER TABLE users_phonenumbers DROP FOREIGN KEY FK_2078A879D626887C');
        $this->addSql('ALTER TABLE media_object DROP FOREIGN KEY FK_14D4313271CAA3E7');
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CAA76ED395');
        $this->addSql('ALTER TABLE reviews DROP FOREIGN KEY FK_6970EB0FA76ED395');
        $this->addSql('ALTER TABLE social_media DROP FOREIGN KEY FK_20BC159EA76ED395');
        $this->addSql('ALTER TABLE turno DROP FOREIGN KEY FK_E7976762A76ED395');
        $this->addSql('ALTER TABLE users_phonenumbers DROP FOREIGN KEY FK_2078A879A76ED395');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE available_date');
        $this->addSql('DROP TABLE configurations');
        $this->addSql('DROP TABLE contact_message');
        $this->addSql('DROP TABLE faq');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE persona');
        $this->addSql('DROP TABLE phone_number');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE reviews');
        $this->addSql('DROP TABLE servicio');
        $this->addSql('DROP TABLE social_media');
        $this->addSql('DROP TABLE turno');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE users_phonenumbers');
    }
}
