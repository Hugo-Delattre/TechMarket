<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240430093350 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('CREATE TABLE "order" (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          customer_id INTEGER NOT NULL,
          total_price DOUBLE PRECISION NOT NULL,
          creation_date DATETIME NOT NULL,
          CONSTRAINT FK_F52993989395C3F3 FOREIGN KEY (customer_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        )');
    $this->addSql('CREATE INDEX IDX_F52993989395C3F3 ON "order" (customer_id)');
    $this->addSql('CREATE TABLE order_product (
          order_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          PRIMARY KEY(order_id, product_id),
          CONSTRAINT FK_2530ADE68D9F6D38 FOREIGN KEY (order_id) REFERENCES "order" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE,
          CONSTRAINT FK_2530ADE64584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        )');
    $this->addSql('CREATE INDEX IDX_2530ADE68D9F6D38 ON order_product (order_id)');
    $this->addSql('CREATE INDEX IDX_2530ADE64584665A ON order_product (product_id)');
    $this->addSql('CREATE TABLE product (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255) DEFAULT NULL,
          photo VARCHAR(255) DEFAULT NULL,
          price DOUBLE PRECISION NOT NULL
        )');
    $this->addSql('CREATE TABLE user (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          login VARCHAR(180) NOT NULL,
          roles CLOB NOT NULL --(DC2Type:json)
          ,
          PASSWORD VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          firstname VARCHAR(255) DEFAULT NULL,
          lastname VARCHAR(255) DEFAULT NULL
        )');
    $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_LOGIN ON user (login)');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('DROP TABLE "order"');
    $this->addSql('DROP TABLE order_product');
    $this->addSql('DROP TABLE product');
    $this->addSql('DROP TABLE user');
  }
}
