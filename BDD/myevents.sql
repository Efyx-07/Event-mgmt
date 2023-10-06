CREATE DATABASE myevents;


CREATE TABLE evenements (
    id INT AUTO_INCREMENT PRIMARY KEY, /* génère un id complexe */
    titre VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    lieu VARCHAR(255) NOT NULL,
    image_source VARCHAR(255) NOT NULL,
    image_alt VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP /* génère automatiquement la date de création de l'event */
);

ALTER TABLE evenements
ADD COLUMN uuid VARCHAR(36);