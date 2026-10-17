# LÉVANIA PARFUMS — HAUTE PARFUMERIE & E-COMMERCE PLATFORM

> **"Découvrez la fragrance qui bouge avec vous."**  
> Plateforme e-commerce haut de gamme de parfumerie artisanale, réseau de revendeurs, gamification de fidélité et administration intelligente.

---

## 1. Identité de Marque & Le Concept "THE WAVE"

L'univers de **LÉVANIA PARFUMS** s'articule autour de trois expressions olfactives et visuelles distinctives de la **Vague (The Wave)** :

- **Vague Signature** : Vert olive profond, or champagne, bordeaux impérial. Reflets liquides raffinés.
- **Onde Soyeuse (Soft Wave)** : Ivoire, crème, néroli de Nabeul et fleur de coton. Courbes translucides et délicatesse.
- **Onde Sombre & Boisée (Intense Wave)** : Noir ébène, oud d'Oman, cuir russe et ambre gris. Contraste dramatique et sillage monumental.

Les photographies réelles du flacon scellé, du bouchon noir et des emballages cylindriques dorés et vert olive sont intégrées au cœur de la plateforme sous `/public/brand/`.

---

## 2. Architecture & Les Trois Espaces Dédiés

La plateforme unifie 3 expériences distinctes partageant le même modèle de données :

### Panel A — Espace Client Prestige
- **Boutique & Catalogue éditorial** (`/shop`) avec filtres par famille olfactive, intensité, format (50ml & 100ml) et prix en TND.
- **Podium des Bestsellers** (Top 3 sur piédestal surélevé + 7 créations incontournables).
- **Trouver Mon Parfum** (`/discover`) : Questionnaire interactif assisté par IA recommandant exactement les 4 meilleures correspondances olfactives.
- **Composer Mon Coffret** (`/compose-box`) : Configurateur de coffret cadeau sur mesure (écrin cylindrique, parfums, rubans satin, dédicace calligraphiée).
- **Offres du Mois & Packs Cérémonie** (`/promotions`) : Packs Mariage, Omra, Anniversaires, ventes flash avec compte à rebours.
- **Mystery Boxes** (`/mystery-box`) : Boîtes surprises avec valeur marchande minimale garantie et transparence des probabilités.
- **Panier & Commande Sécurisée** (`/cart`, `/checkout`) : Calcul rigoureux en millimes tunisiens, 24 gouvernorats, paiement à la livraison (COD) ou carte bancaire, attribution automatique de Luck.
- **Roue du Destin** (`/account/luck`) : Gamification avec 4 paliers de Vagues réelles.
- **Certificat Flacon QR Mobile-First** (`/p/[token]`) : Expérience de traçabilité et révélation liquide du flacon.
- **Concierge Olfactif IA** : Chatbot flottant assistant les clients sur les accords, la livraison et les règles de fidélité.

### Panel B — Espace Administration Centrale (`/admin`)
- **Tableau de Bord Exécutif** : Chiffre d'affaires brut vs net, nombre de commandes, panier moyen, alertes de stocks critiques (< 15 ex.).
- **Gestion des Flacons & Podium** : Gestion des formats, tarifs, stocks et attribution des rangs bestsellers.
- **Expéditions & Commandes** : Cycle de vie complet (En Attente &rarr; Confirmée &rarr; En Préparation &rarr; Expédiée &rarr; Livrée &rarr; Annulée).
- **Validation Revendeurs** : Audit des preuves de vente et validation des commissions.
- **Configuration des Vagues** : Paramétrage des probabilités et stocks de lots de la Roue du Destin.
- **Générateur de QR Codes** : Génération de jetons par lot avec codes de fabrication.

### Panel C — Réseau Revendeurs (`/reseller`)
- **6 Rangs Métalliques** : Iron (5 TND/vente), Bronze (6 TND), Gold (7.5 TND), Platinum (8.5 TND), Diamond (9 TND), Master (10 TND/vente).
- **Déclaration de Vente** : Formulaire de soumission avec référence commande et téléphone client.
- **Suivi des Commissions** : Soldes En Attente, Validées (Payables) et Déjà Versées.
- **Objectifs & Primes** : Défis hebdomadaires et mensuels avec jauges de progression.
- **Salon de Discussion Réseau** : Messagerie officielle entre revendeurs et direction.

---

## 3. Règle Officielle de la Luck & Roue du Destin

Conformément au cahier des charges strict :

1. **Formule de gain** :  
   $$\text{Luck gagnée} = \lfloor \frac{\text{Montant éligible en millimes}}{10\,000} \rfloor$$
   *(Exemples vérifiés : 9 TND &rarr; 0 Luck ; 59 TND &rarr; 5 Luck ; 100 TND &rarr; 10 Luck ; 259.5 TND &rarr; 25 Luck ; 1 000 TND &rarr; 100 Luck).*

2. **Plafond Absolu (Cap)** : **7 777 Luck**.

3. **Les 4 Vagues Officielles de la Roue** :
   - **Normal Wave** : 1 – 100 Luck
   - **Fire Wave** : 101 – 1 000 Luck
   - **Royal Wave** : 1 001 – 7 776 Luck
   - **Admin Wave** : Exactement 7 777 Luck *(Le Trésor Suprême Lévania)*

4. **Consommation** : Chaque spin consomme **100% du solde de Luck**. Le résultat est arrêté par le serveur avant le déclenchement de l'animation.

5. **Parrainage (Règle 50%)** : Le parrain perçoit **50% des points fidélité réels** accumulés par son filleul sur son premier achat qualifié dès 100 TND.

---

## 4. Démarrage Rapide

### Prérequis
- Node.js >= 20
- npm ou pnpm

### Installation & Lancement
```bash
# Installation des dépendances
npm install

# Lancer la vérification des règles de calcul (Tests unitaires)
npx tsx src/verify-rules.ts

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
npm start
```

Rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## 5. Schéma de Base de Données

Le script SQL complet est situé dans `supabase/migrations/001_levania_core_schema.sql` et comprend :
- Tables relationnelles avec contraintes et millimes entiers (`INT`).
- Procédure stockée `award_order_luck()` avec gestion atomique du plafond 7 777.
- Politiques Row Level Security (RLS) complètes pour chaque table.
