# 📘 Guide de présentation - DossierFlow

## 🎯 Comment présenter ce projet en entretien

### Pitch d'introduction (30 secondes)

> "J'ai développé **DossierFlow**, une application React qui transpose un besoin réel que j'ai rencontré dans la fonction publique : gérer des dossiers avec des deadlines critiques. L'application utilise un **système de feu tricolore** pour visualiser l'urgence, permet d'assigner des tâches à des équipes, et suit l'avancement en temps réel. C'était l'occasion parfaite pour approfondir **useReducer** avec une logique métier complexe."

---

## 🧠 Points techniques à mettre en avant

### 1. Architecture useReducer + Context API

**Pourquoi ce choix ?**
- État complexe (dossiers, actions, deadlines, statuts)
- Plusieurs types d'actions interdépendantes
- Logique métier centralisée et testable

**Code clé à montrer :**
```javascript
function dossierReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ACTION": {
      // Calcul automatique du statut en fonction des actions cochées
      const allDone = updatedActions.every((act) => act.done);
      const someDone = updatedActions.some((act) => act.done);
      
      return {
        ...dossier,
        status: allDone ? "completed" : someDone ? "in-progress" : "pending",
      };
    }
  }
}
```

**Ce que ça démontre :**
✅ Maîtrise de useReducer pour logique complexe  
✅ Calculs dérivés automatiques  
✅ Immutabilité des données (spread operators)

---

### 2. Fonction de calcul d'urgence

**Code clé :**
```javascript
export function calculateUrgency(deadline) {
  const now = Date.now();
  const timeLeft = deadline - now;
  const totalTime = 7 * 24 * 60 * 60 * 1000;
  const percentLeft = (timeLeft / totalTime) * 100;

  if (timeLeft <= 0) return "expired";
  if (percentLeft > 50) return "green";
  if (percentLeft > 20) return "orange";
  return "red";
}
```

**Ce que ça démontre :**
✅ Calculs temporels (timestamps)  
✅ Logique conditionnelle claire  
✅ Fonction pure (facile à tester)

---

### 3. Optimisation avec useCallback

**Code clé :**
```javascript
const toggleAction = useCallback((dossierId, actionId) => {
  dispatch({
    type: "TOGGLE_ACTION",
    payload: { dossierId, actionId },
  });
}, []);
```

**Ce que ça démontre :**
✅ Prévention des re-renders inutiles  
✅ Performance optimisée  
✅ Bonnes pratiques React

---

## 💬 Réponses aux questions d'entretien probables

### Q: "Pourquoi useReducer plutôt que useState ?"

**Ta réponse :**
> "J'ai commencé avec useState sur ma todo list basique, mais quand j'ai voulu ajouter les calculs d'urgence, les statuts dérivés, et les actions imbriquées, j'avais **trop de useState** et la logique était éparpillée. Avec useReducer, j'ai centralisé toute la logique métier dans le reducer, ce qui rend le code plus maintenable et plus facile à tester. Par exemple, quand je coche une action, le reducer recalcule automatiquement le statut du dossier sans que je doive gérer ça manuellement dans le composant."

---

### Q: "Comment as-tu géré le temps réel ?"

**Ta réponse :**
> "Actuellement, les couleurs du feu tricolore sont **calculées au render**. Pour une V2, j'ajouterais un `useEffect` avec `setInterval` pour recalculer l'urgence toutes les minutes et mettre à jour l'affichage automatiquement. Mais pour un POC portfolio, le calcul au render suffit et évite de surcharger l'app."

---

### Q: "Pourquoi ne pas avoir utilisé une bibliothèque UI ?"

**Ta réponse :**
> "Je voulais démontrer ma maîtrise du **CSS pur** et de la création de composants custom. Les bibliothèques comme Material-UI sont excellentes en prod, mais ici je voulais montrer que je sais créer un design pro from scratch : grids CSS, transitions, responsive, états hover... tout en CSS vanille."

---

### Q: "Comment tu testerais cette application ?"

**Ta réponse :**
> "Je commencerais par **tester le reducer en isolation** avec Jest, car c'est de la logique pure :
> - Test : ajouter un dossier
> - Test : cocher une action met à jour le statut
> - Test : calculateUrgency retourne la bonne couleur selon le temps restant
> 
> Ensuite, j'utiliserais **React Testing Library** pour tester les interactions utilisateur :
> - Créer un dossier via le formulaire
> - Cocher une action et vérifier que la barre de progression change
> - Vérifier que le feu tricolore affiche la bonne couleur"

---

## 🎨 L'histoire du projet (storytelling)

**Début :**
> "Quand j'étais dans la fonction publique, on gérait des procès-verbaux avec des délais légaux très stricts. Un PV non transmis à temps, c'était un problème juridique. On avait des tableaux Excel, des post-its, mais aucun système d'alerte visuel."

**Développement :**
> "En apprenant React, j'ai réalisé que je pouvais transposer ce besoin en application. J'ai gardé le concept (dossiers, deadlines, actions) mais en l'anonymisant avec un vocabulaire neutre."

**Résultat :**
> "J'ai créé DossierFlow : un système qui **alerte visuellement** quand le temps presse, qui **suit l'avancement** des actions, et qui permet à un coordinateur d'assigner des dossiers. C'est devenu mon projet le plus abouti pour démontrer useReducer avec une vraie logique métier."

---

## 📊 Roadmap (évolutions futures à mentionner)

Si le recruteur demande "Comment tu l'améliorerais ?" :

1. **Notifications push** : Alerte navigateur 1h avant échéance
2. **Persistance des données** : LocalStorage ou backend
3. **Filtres avancés** : Par statut, par équipe, par urgence
4. **Export PDF** : Générer un rapport de dossier
5. **Graphiques** : Dashboard avec stats (taux de respect des délais)
6. **Backend + Auth** : Multi-utilisateurs réel avec rôles

---

## ✅ Checklist avant démo

Avant de montrer le projet en entretien :

- [ ] Avoir 2-3 dossiers de démo créés
- [ ] Dont un en rouge (urgence critique)
- [ ] Pouvoir expliquer chaque ligne du reducer
- [ ] Savoir parler du calcul d'urgence
- [ ] Préparer une anecdote sur le contexte d'origine

---

## 🚀 Déploiement Vercel

```bash
# Dans le dossier dossier-flow
npm run build
# Puis sur Vercel, pointer vers le dossier build
```

Ajouter dans ton README GitHub :
```markdown
🔗 **Démo live** : https://dossier-flow.vercel.app
```

---

**Bon courage Seb ! Tu as un projet solide qui montre une vraie réflexion métier ET technique. 💪**
