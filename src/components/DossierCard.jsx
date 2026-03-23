import { useContext, useState, useEffect } from "react";
import {
  DossierContext,
  calculateUrgency,
} from "../context/DossierContext.jsx";

function DossierCard({ dossier }) {
  const { toggleAction, deleteDossier } = useContext(DossierContext);

  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const timeLeft = dossier.deadline - currentTime;
  const urgency = calculateUrgency(dossier.deadline);
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const getUrgencyColor = () => {
    switch (urgency) {
      case "green":
        return "#22c55e";
      case "orange":
        return "#f97316";
      case "red":
        return "#ef4444";
      case "expired":
        return "#6b7280";
      default:
        return "#22c55e";
    }
  };

  const getStatusBadge = () => {
    switch (dossier.status) {
      case "completed":
        return <span className="badge badge-success">✓ Terminé</span>;
      case "in-progress":
        return <span className="badge badge-warning">⏳ En cours</span>;
      case "pending":
        return <span className="badge badge-info">📋 À traiter</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`dossier-card dossier-card--${urgency}`}>
      {/* En-tête avec feu tricolore */}
      <div className="dossier-header">
        <div className="dossier-info">
          <h3>{dossier.reference}</h3>
          {getStatusBadge()}
        </div>

        {/* Feu tricolore */}
        <div className="urgency-indicator">
          <div
            className="traffic-light"
            style={{ backgroundColor: getUrgencyColor() }}
          >
            {urgency === "expired" ? "⏰" : ""}
          </div>
        </div>
      </div>

      {/* Temps restant */}
      <div className="time-remaining">
        {urgency === "expired" ? (
          <span className="expired">⚠️ Échéance dépassée</span>
        ) : (
          <span>
            ⏱️ Temps restant :{" "}
            <strong>
              {hoursLeft}h {minutesLeft}min
            </strong>
          </span>
        )}
      </div>

      {/* Assignation */}
      <div className="assignment">
        👤 Assigné à : <strong>{dossier.assignedTo}</strong>
      </div>

      {/* Liste des actions */}
      <div className="actions-list">
        <h4>Actions à effectuer :</h4>
        {dossier.actions.map((action) => (
          <label key={action.id} className="action-item">
            <input
              type="checkbox"
              checked={action.done}
              onChange={() => toggleAction(dossier.id, action.id)}
            />
            <span className={action.done ? "done" : ""}>{action.label}</span>
          </label>
        ))}
      </div>

      {/* Progression */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(dossier.actions.filter((a) => a.done).length / dossier.actions.length) * 100}%`,
          }}
        />
      </div>

      {/* Actions */}
      <button className="btn-delete" onClick={() => deleteDossier(dossier.id)}>
        🗑️ Supprimer
      </button>
    </div>
  );
}

export default DossierCard;
