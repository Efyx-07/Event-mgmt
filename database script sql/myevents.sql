CREATE DATABASE myevents;

CREATE TABLE administrateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

/* administrateur générique, récupère la paternité des évènements dont l'administrateur est supprimé */
INSERT INTO administrateurs (nom, prenom, email, hashed_password)
VALUES ('Administrateur', 'Supprimé', 'adminsupprime@example.com', 'motdepassehashé'); 

CREATE TABLE participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_entreprise VARCHAR(50),
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telephone VARCHAR(10)
);

CREATE TABLE evenements (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    titre VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    lieu VARCHAR(100) NOT NULL,
    image_source VARCHAR(255) NOT NULL,
    image_alt VARCHAR(255) NOT NULL,
    presentation LONGTEXT,
    programme LONGTEXT,
    infos_pratiques LONGTEXT,
    partenaires LONGTEXT,
    nom_client VARCHAR(50),
    logo_client_source VARCHAR(255),
    logo_client_alt VARCHAR(255),
    site_client VARCHAR(255),
    slug VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    administrateur_id INT,
    FOREIGN KEY (administrateur_id) REFERENCES administrateurs(id)
);

UPDATE evenements
SET administrateur_id = 1  
WHERE administrateur_id = 3;  

CREATE TABLE participants_evenements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT,
    evenement_id INT,
    FOREIGN KEY (participant_id) REFERENCES myevents.participants (id),
    FOREIGN KEY (evenement_id) REFERENCES myevents.evenements (id),
    UNIQUE KEY uc_participant_event (participant_id, evenement_id)
);

