import { createContext, useReducer, useCallback } from "react";

export const DossierContext = createContext();

/* REDUCER - Gère toutes les actions sur les dossiers */
function dossierReducer(state, action) {
  switch (action.type) {
    case "ADD_DOSSIER": {
      const newDossier = {
        id: Date.now(),
        reference: action.payload.reference,
        typeDossier: action.payload.typeDossier,
        deadline: action.payload.deadline,
        actions: action.payload.actions,
        assignedTo: action.payload.assignedTo || "Non assigné",
        createdAt: Date.now(),
        status: "pending",
      };
      return [...state, newDossier];
    }

    case "TOGGLE_ACTION": {
      return state.map((dossier) => {
        if (dossier.id === action.payload.dossierId) {
          const updatedActions = dossier.actions.map((act) =>
            act.id === action.payload.actionId
              ? { ...act, done: !act.done }
              : act,
          );

          const allDone = updatedActions.every((act) => act.done);
          const someDone = updatedActions.some((act) => act.done);

          return {
            ...dossier,
            actions: updatedActions,
            status: allDone
              ? "completed"
              : someDone
                ? "in-progress"
                : "pending",
          };
        }
        return dossier;
      });
    }

    case "DELETE_DOSSIER": {
      return state.filter((dossier) => dossier.id !== action.payload.id);
    }

    case "UPDATE_ASSIGNMENT": {
      return state.map((dossier) =>
        dossier.id === action.payload.dossierId
          ? { ...dossier, assignedTo: action.payload.assignedTo }
          : dossier,
      );
    }

    default:
      return state;
  }
}

export function calculateUrgency(deadline) {
  const now = Date.now();
  const timeLeft = deadline - now;

  if (timeLeft <= 0) return "expired";

  const heuresRestantes = timeLeft / (1000 * 60 * 60);
  const heuresDansJourneeActuelle = heuresRestantes % 24;

  const percentLeft = (heuresDansJourneeActuelle / 24) * 100;

  if (percentLeft > 50) return "green";
  if (percentLeft > 20) return "orange";
  return "red";
}

export function DossierProvider({ children }) {
  const [dossiers, dispatch] = useReducer(dossierReducer, []);

  const addDossier = useCallback(
    (reference, typeDossier, deadline, actions, assignedTo) => {
      dispatch({
        type: "ADD_DOSSIER",
        payload: { reference, typeDossier, deadline, actions, assignedTo },
      });
    },
    [],
  );

  const toggleAction = useCallback((dossierId, actionId) => {
    dispatch({
      type: "TOGGLE_ACTION",
      payload: { dossierId, actionId },
    });
  }, []);

  const deleteDossier = useCallback((id) => {
    dispatch({
      type: "DELETE_DOSSIER",
      payload: { id },
    });
  }, []);

  const updateAssignment = useCallback((dossierId, assignedTo) => {
    dispatch({
      type: "UPDATE_ASSIGNMENT",
      payload: { dossierId, assignedTo },
    });
  }, []);

  return (
    <DossierContext.Provider
      value={{
        dossiers,
        addDossier,
        toggleAction,
        deleteDossier,
        updateAssignment,
      }}
    >
      {children}
    </DossierContext.Provider>
  );
}
