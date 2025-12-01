# 🏢 AccessWork - Gestion d'Employés Accessible

![Material Design 3](https://img.shields.io/badge/Material%20Design-3-6750A4?style=for-the-badge)
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**AccessWork** est une application web moderne de gestion d'employés conçue avec un focus extrême sur l'accessibilité et l'expérience utilisateur. Construite avec React, TypeScript et Material Design 3, elle offre une interface complète pour la gestion quotidienne des employés et des managers.

---

## ✨ Caractéristiques Principales

### 🎨 Design
- **Material Design 3** avec couleurs personnalisées (#6750A4, #D0BCFF)
- **Typographie Roboto Flex** pour une lisibilité optimale
- **Sans bordures** pour un design épuré et moderne
- **Animations fluides** et transitions Material Design
- **Mode sombre/clair** complet

### ♿ Accessibilité (WCAG 2.1 AA)
- **5 modes daltonisme** (Protanopie, Deuteranopie, Tritanopie, Monochrome, Normal)
- **Mode contraste élevé** pour malvoyants
- **Text-to-Speech** intégré avec lecture vocale du contenu
- **Assistant vocal** avec FAB (Floating Action Button)
- **Gros boutons tactiles** (min 48-56px)
- **Focus visible** avec outline lavande
- **Navigation au clavier** complète
- **ARIA labels** et rôles appropriés
- **Effets sonores** avec contrôle ON/OFF

### 📋 Modules Fonctionnels

#### Pour Tous
1. **Dashboard** - Vue d'ensemble personnalisée
2. **Tâches** - Gestion complète des tâches avec filtres et statistiques
3. **Messages** - Messagerie interne en temps réel
4. **Documents** - Bibliothèque de documents avec recherche et téléchargement
5. **Notifications** - Centre de notifications avec filtres
6. **Équipe** - Annuaire d'équipe avec profils détaillés
7. **Planning** - Calendrier et gestion des horaires
8. **Absences** - Gestion des congés et demandes
9. **Profil** - Profil utilisateur éditable
10. **Accessibilité** - Paramètres d'accessibilité avancés

#### Pour Managers
11. **Management** - Dashboard manager avec statistiques d'équipe

---

## 🚀 Technologies Utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling utilitaire
- **Shadcn/UI** - Composants UI réutilisables
- **Lucide React** - Icônes modernes
- **Sonner** - Toast notifications
- **Web Speech API** - Text-to-Speech
- **Motion** - Animations fluides

---

## 📦 Installation

```bash
# Cloner le repository
git clone <repository-url>

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

---

## 🎯 Utilisation

### Connexion
L'application propose deux rôles :
- **Employé** - Accès aux fonctionnalités standards
- **Manager** - Accès à la gestion d'équipe en plus

### Navigation
Utilisez la barre de navigation en haut pour accéder aux différents modules.

### Accessibilité
1. **FAB Thème** (en bas à droite) - Changer le thème et les modes d'accessibilité
2. **FAB Assistant** (à côté) - Activer/désactiver la lecture vocale
3. **Paramètres d'accessibilité** - Page dédiée pour tous les réglages

### Raccourcis Clavier
- `Tab` - Navigation entre éléments
- `Enter` / `Space` - Activer un bouton
- `Esc` - Fermer les dialogues

---

## 🎨 Charte Graphique

### Couleurs Principales
```css
--primary: #6750A4        /* Violet principal */
--secondary: #D0BCFF      /* Lavande secondaire */
--background: #FEF7FF     /* Fond clair */
--card: #FFFFFF           /* Cartes */
```

### Typographie
```css
--font-headline-1: 32px   /* Titres principaux */
--font-headline-2: 28px   /* Titres de section */
--font-subheading: 20px   /* Sous-titres */
--font-body: 16px         /* Texte normal */
--font-caption: 14px      /* Petits textes */
```

### Élévations
```css
elevation-0  /* Pas d'ombre */
elevation-1  /* Ombre légère */
elevation-2  /* Ombre moyenne */
elevation-3  /* Ombre prononcée */
```

---

## 📁 Structure du Projet

```
/
├── components/
│   ├── ui/                    # Composants Shadcn UI
│   ├── AbsenceManagement.tsx  # Gestion absences
│   ├── Documents.tsx          # Bibliothèque documents
│   ├── EmployeeDashboard.tsx  # Dashboard employé
│   ├── ManagerDashboard.tsx   # Dashboard manager
│   ├── Messages.tsx           # Messagerie
│   ├── Navigation.tsx         # Barre de navigation
│   ├── Notifications.tsx      # Centre notifications
│   ├── Planning.tsx           # Calendrier
│   ├── ProfilePage.tsx        # Profil utilisateur
│   ├── Tasks.tsx              # Gestion tâches
│   ├── Team.tsx               # Annuaire équipe
│   ├── AccessibilitySettings.tsx
│   ├── FloatingActionButtons.tsx
│   ├── Login.tsx
│   └── ...
├── styles/
│   └── globals.css            # Styles globaux + MD3
├── App.tsx                    # Point d'entrée
└── ...
```

---

## ⚙️ Fonctionnalités Détaillées

### 🔄 Tâches
- Filtrage par statut (Toutes, En cours, Terminées, Urgentes)
- Statistiques en temps réel
- Progression individuelle par tâche
- Actions rapides (Détails, Terminer)
- Recherche et tri

### 💬 Messages
- Chat en temps réel
- Liste de conversations avec filtres
- Badges de notifications
- Recherche de conversations
- Avatars colorés uniques
- Support mobile/desktop

### 📄 Documents
- Upload de fichiers (placeholder)
- Téléchargement de documents
- Filtrage par type (PDF, Docs, Images)
- Recherche en temps réel
- Métadonnées complètes
- Statistiques d'utilisation

### 🔔 Notifications
- Types multiples (Info, Succès, Avertissement, Message)
- Marquage lu/non lu
- Suppression de notifications
- Filtrage avancé
- Compteur de non lues

### 👥 Équipe
- Annuaire complet avec profils
- Filtrage par département
- Statut en ligne/hors ligne
- Compétences et badges
- Informations de contact
- Actions rapides (Email, Appel)

### 👤 Profil
- Photo de profil
- Informations personnelles éditables
- Informations professionnelles
- Statistiques personnelles
- Mode édition sécurisé

---

## 🌐 Accessibilité Avancée

### Modes Daltonisme
L'application propose 5 modes de daltonisme :
1. **Normal** - Affichage standard
2. **Protanopie** - Rouge/vert (rouge faible)
3. **Deuteranopie** - Rouge/vert (vert faible)
4. **Tritanopie** - Bleu/jaune
5. **Monochrome** - Noir et blanc

### Text-to-Speech
- Lecture automatique des notifications
- Lecture du contenu des pages
- Contrôle de volume et vitesse (futur)
- Support de plusieurs langues (futur)

### Contraste Élevé
- Contraste amélioré pour tous les éléments
- Bordures plus visibles
- Textes plus contrastés
- Icônes plus grandes

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT.

---

## 👏 Remerciements

- **Material Design 3** - Google
- **Shadcn/UI** - Design system
- **Lucide** - Icônes
- **Tailwind CSS** - Framework CSS
- **React** - Framework JavaScript

---

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation

---

## 🎉 Statut du Projet

✅ **Version 1.0** - Application complète et fonctionnelle
- 11 modules principaux
- 100% accessible WCAG 2.1 AA
- Design Material Design 3 complet
- Responsive design
- Mode sombre/clair
- 5 modes daltonisme
- Text-to-Speech intégré

**Prête pour la production !**

---

Made with ❤️ for accessibility
