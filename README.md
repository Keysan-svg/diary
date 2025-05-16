📌 Projet Fil Rouge: Intégration et Sécurisation d’une BDD
📖 Contexte
Ce projet vise à développer une application sécurisée, en mettant l’accent sur la protection des données et les bonnes pratiques en matière de cybersécurité web. 
Un serveur d’application communiquant avec la base de données.
Une application back-end et base de données.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
🔧 Technologies utilisées
🚀 Serveur d'application (Backend)
Node.js avec Express pour la gestion des requêtes et de la logique métier.

🗄️ Base de données
PostgreSQL : Base de données relationnelle robuste et performante, utilisant le port 5432 et sécurisée via SSL/TLS.



____________________________________________________________________________________________________________________________________________________________________


📦 Dépendances installées
Ce projet utilise plusieurs bibliothèques pour assurer la sécurité, la gestion des requêtes et la base de données :

🔐 bcrypt → Hashage sécurisé des mots de passe.

🌍 cors → Gestion des autorisations d’accès entre le client et le serveur.

🚀 express → Framework web rapide et minimaliste.

🔑 jsonwebtoken → Génération et vérification des tokens JWT pour l'authentification.

🗄️ sequelize → ORM pour interagir avec PostgreSQL et structurer les requêtes SQL.

✅ express-validator → Validation et assainissement des données envoyées par l’utilisateur.

____________________________________________________________________________________________________________________________________________________________________


🖥️ Fonctionnement du serveur (serveur.js)
Le fichier serveur.js configure et démarre le serveur d'application. Voici les étapes principales :

Importation des modules nécessaires (express, dotenv, cors, etc.).

Chargement des variables d'environnement depuis un fichier .env.

Connexion à la base de données pour vérifier la disponibilité avec SSL activé.

Configuration du serveur :

Gestion des formats de requête avec express.urlencoded() et express.json().

Activation de CORS (Cross-Origin Resource Sharing) pour permettre les échanges entre le serveur et le client.

Mise en place des routes utilisateurs (/api/v1/user) pour gérer l'authentification et les données des utilisateurs.

Ajout d'un middleware permettant la vérification du rôle admin.

Lancement du serveur sur le port 3000.


____________________________________________________________________________________________________________________________________________________________________


🔗 Relation entre les middlewares et routes
🔹 Middlewares d’authentification (authMiddlewares.js)
checkIfTokenExists → Vérifie que l’utilisateur envoie un token dans l’en-tête de la requête.

decodeToken → Décode le token JWT pour récupérer les informations de l’utilisateur.

isAdmin → Vérifie si l'utilisateur possède le rôle admin avant d’accéder à certaines routes sécurisées.

➡️ Ces middlewares sont utilisés sur les routes nécessitant une authentification et/ou des autorisations spécifiques :

js
route.get('/me', [checkIfTokenExists, decodeToken], userController.getOneByEmail);
route.delete('/:id', [checkIfTokenExists, decodeToken, isAdmin], userController.deleteOneById);
route.get('/admin/dashboard', [checkIfTokenExists, decodeToken, isAdmin], adminController.dashboard);
🔹 Middlewares de validation (validatorMiddleware.js)
password → Vérifie que le mot de passe respecte les exigences de sécurité (longueur minimale, caractères spéciaux, etc.).

email → Vérifie que l’email est fourni.

validationResult → Vérifie si des erreurs sont présentes après la validation des champs.

➡️ Ces middlewares sont utilisés sur les routes où l’utilisateur s’enregistre ou se connecte :

js
route.post('/', [password, validationResult], userController.store);
route.post('/login', email, validationResult, userController.login);
Ces middlewares permettent de filtrer et sécuriser les requêtes avant qu’elles n’atteignent le contrôleur qui effectue les opérations sur la base de données.


____________________________________________________________________________________________________________________________________________________________________


🔒 Sécurité & Contraintes Techniques
🔹 Serveur d’application
✔️ API RESTful avec architecture sécurisée. ✔️ Utilisation de middlewares de validation et assainissement des requêtes avec try-catch pour éviter les erreurs. ✔️ Mécanismes de contre-pression et verrous pour limiter les attaques par surcharge. ✔️ Authentification et autorisation sécurisée avec JWT et OAuth. ✔️ Cryptage des données sensibles via bcrypt. ✔️ Ajout d'un middleware permettant la vérification du rôle admin.

🔹 Base de données (PostgreSQL)
✔️ Sécurisation via SSL/TLS pour chiffrer les connexions. ✔️ Utilisation du port 5432, le port par défaut de PostgreSQL pour les communications avec le serveur.


____________________________________________________________________________________________________________________________________________________________________


🔧 Axes d’amélioration
Voici quelques améliorations possibles à apporter aux middlewares et routes existants :

✅ Middlewares d’authentification
🔹 Amélioration de la gestion des erreurs → Ajouter des logs pour tracer les erreurs d’authentification.

🔹 Expiration automatique des tokens → Intégrer une logique pour invalider les tokens après un délai spécifique.

🔹 Rafraîchissement des tokens → Mettre en place un système de refresh token pour éviter une reconnexion trop fréquente.

✅ Middlewares de validation
🔹 Renforcer la validation des emails → Vérifier le format d’email et s’assurer qu’il provient d’un domaine légitime.

🔹 Limiter les tentatives de connexion → Ajouter un système de rate-limiting pour éviter les attaques de force brute.

🔹 Logs des erreurs de validation → Stocker les erreurs récurrentes pour améliorer la sécurité.

✅ Routes et contrôleurs
🔹 Ajout d’une gestion des sessions → Stocker les sessions de connexion sécurisées pour améliorer l’expérience utilisateur.

🔹 Ajout d’une récupération de compte → Permettre aux utilisateurs de récupérer un compte perdu via un email sécurisé.

🔹 Ajout d’un système de rôles et permissions → Pour gérer les accès aux différentes fonctionnalités en fonction du rôle (admin, user, etc.).

🔹 Optimisation des requêtes vers PostgreSQL → Réduction des latences via une meilleure indexation des tables.
