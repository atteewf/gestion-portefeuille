# 🗂️ DossierFlow

**Application de gestion de dossiers avec suivi temporel et système d'alertes visuelles**

## 📋 Concept

Application développée pour illustrer un workflow collaboratif inspiré d'un besoin réel rencontré dans la fonction publique : la gestion de dossiers avec deadlines critiques, assignation de tâches et suivi d'avancement.

## ✨ Fonctionnalités

### 🚦 Système d'alerte visuel (feu tricolore)
- **Vert** : > 50% du temps restant
- **Orange** : 20-50% du temps restant  
- **Rouge** : < 20% du temps restant
- **Gris** : Échéance dépassée

### 👔 Mode Coordinateur
- Création de nouveaux dossiers
- Définition des échéances (en heures)
- Assignation à une équipe
- Actions prédéfinies à effectuer

### 👨‍💼 Mode Contributeur
- Consultation des dossiers assignés
- Validation des actions effectuées
- Suivi de la progression

### 📊 Suivi en temps réel
- Temps restant affiché (heures + minutes)
- Barre de progression des actions
- Statut visuel (À traiter / En cours / Terminé)

## 🛠️ Stack technique

- **React 19** avec hooks
- **useReducer** pour la gestion d'état complexe
- **Context API** pour la distribution de l'état
- **CSS pur** (pas de bibliothèque UI)

## 📚 Points d'apprentissage démontrés

### 1. useReducer avancé
```javascript
function dossierReducer(state, action) {
  switch (action.type) {
    case "ADD_DOSSIER":
      // Logique de création
    case "TOGGLE_ACTION":
      // Calcul auto du statut
    case "UPDATE_ASSIGNMENT":
      // Mise à jour
  }
}
```

### 2. Calculs dérivés
- Urgence calculée automatiquement en fonction du temps restant
- Statut déduit des actions cochées
- Tri intelligent par priorité

### 3. Architecture composants
- Séparation claire : Context / Composants / Logique
- useCallback pour optimisation
- Props drilling évité grâce au Context

## 🎯 Cas d'usage métier

L'application transpose un besoin réel :
- **Contexte** : Traitement de dossiers avec contraintes temporelles fortes
- **Problème** : Risque de dépassement de délais, manque de visibilité
- **Solution** : Alertes visuelles + suivi d'actions + assignation claire

## 🚀 Installation

```bash
npm install
npm start
```

## 📝 Évolutions possibles

- [ ] Filtres par statut/urgence
- [ ] Notifications avant échéance
- [ ] Export PDF des dossiers
- [ ] Historique des actions
- [ ] Authentification multi-utilisateurs

---

**Développé par Seb Ollivier** - [Portfolio](https://seb-ollivier.dev) | [GitHub](https://github.com/atteewf)
