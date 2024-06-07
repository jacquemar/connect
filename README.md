# Business Card Application

## Description

Cette application web permet aux utilisateurs de créer, gérer et partager des cartes de visite numériques. Elle est construite avec le stack MERN (MongoDB, Express.js, React, Node.js) et déployée sur Amazon App Runner.

## Fonctionnalités

- **Création de cartes de visite** : Les utilisateurs peuvent créer des cartes de visite personnalisées avec leurs informations de contact.
- **Gestion des cartes** : Les utilisateurs peuvent modifier et supprimer leurs cartes de visite.
- **Partage de cartes** : Les utilisateurs peuvent partager leurs cartes de visite via un lien unique.

## Prérequis

- Node.js et npm installés sur votre machine.
- Un compte MongoDB Atlas pour la base de données.
- AWS CLI configuré pour gérer les services AWS.

## Installation

1. Clonez ce dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/votre-repository.git
    cd votre-repository
    ```

2. Installez les dépendances pour le frontend et le backend :
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. Créez un fichier `.env` dans le dossier `backend` et ajoutez les configurations nécessaires :
    ```env
    PORT=3000
    MONGO_URI=<votre-mongo-uri>
    JWT_SECRET=<votre-jwt-secret>
    ```

4. Créez un fichier `.env` dans le dossier `frontend` et ajoutez les configurations nécessaires :
    ```env
    REACT_APP_API_URL=<votre-url-api>
    ```

## Déploiement

### Backend

1. Construisez et déployez l'image Docker pour le backend :
    ```bash
    cd backend
    docker build -t votre-utilisateur/business-card-backend .
    docker tag votre-utilisateur/business-card-backend:latest <votre-id-ecr>.dkr.ecr.<votre-region>.amazonaws.com/business-card-backend:latest
    docker push <votre-id-ecr>.dkr.ecr.<votre-region>.amazonaws.com/business-card-backend:latest
    ```

2. Déployez sur Amazon App Runner :
    - Connectez-vous à la console AWS.
    - Accédez à Amazon App Runner.
    - Créez un nouveau service et utilisez l'image Docker que vous avez poussée sur Amazon ECR.

### Frontend

1. Construisez et déployez l'image Docker pour le frontend :
    ```bash
    cd frontend
    docker build -t votre-utilisateur/business-card-frontend .
    docker tag votre-utilisateur/business-card-frontend:latest <votre-id-ecr>.dkr.ecr.<votre-region>.amazonaws.com/business-card-frontend:latest
    docker push <votre-id-ecr>.dkr.ecr.<votre-region>.amazonaws.com/business-card-frontend:latest
    ```

2. Déployez sur Amazon App Runner :
    - Connectez-vous à la console AWS.
    - Accédez à Amazon App Runner.
    - Créez un nouveau service et utilisez l'image Docker que vous avez poussée sur Amazon ECR.

## Utilisation

1. Démarrez le backend :
    ```bash
    cd backend
    npm start
    ```

2. Démarrez le frontend :
    ```bash
    cd frontend
    npm start
    ```

3. Accédez à l'application via votre navigateur à `http://localhost:3000`.

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre un pull request ou ouvrir une issue pour discuter des modifications que vous souhaitez apporter.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
