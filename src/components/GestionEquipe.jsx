import { useContext } from "react";
import { DossierContext } from "../context/DossierContext.jsx";

/* Vue Gestion d'équipe */
function GestionEquipe() {
  const { dossiers } = useContext(DossierContext);
  const equipes = ["Équipe A", "Équipe B", "Service C"];

  const statsParEquipe = equipes.map((equipe) => {
    const dossiersDeLequipe = dossiers.filter((d) => d.assignedTo === equipe);
    const enCours = dossiersDeLequipe.filter(
      (d) => d.status === "in-progress" || d.status === "pending",
    ).length;
    const termines = dossiersDeLequipe.filter(
      (d) => d.status === "completed",
    ).length;

    return {
      nom: equipe,
      total: dossiersDeLequipe.length,
      enCours,
      termines,
    };
  });

  return (
    <div className="gestion-equipe">
      <h2>👥 Gestion d'équipe</h2>

      <div className="equipe-grid">
        {statsParEquipe.map((equipe) => (
          <div key={equipe.nom} className="equipe-card">
            <h3>{equipe.nom}</h3>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Total dossiers :</span>
                <span className="stat-value">{equipe.total}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">En cours :</span>
                <span className="stat-value stat-warning">
                  {equipe.enCours}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Terminés :</span>
                <span className="stat-value stat-success">
                  {equipe.termines}
                </span>
              </div>
            </div>

            {/* Barre de progression de l'équipe */}
            {equipe.total > 0 && (
              <div className="equipe-progress">
                <div
                  className="equipe-progress-fill"
                  style={{
                    width: `${(equipe.termines / equipe.total) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Liste des dossiers par équipe */}
      <div className="dossiers-par-equipe">
        {statsParEquipe
          .filter((eq) => eq.total > 0)
          .map((equipe) => {
            const dossiersDeLequipe = dossiers.filter(
              (d) => d.assignedTo === equipe.nom,
            );

            return (
              <div key={equipe.nom} className="equipe-section">
                <h3>{equipe.nom} - Dossiers actifs</h3>
                <ul className="dossiers-list">
                  {dossiersDeLequipe.map((dossier) => (
                    <li key={dossier.id} className="dossier-item">
                      <span className="dossier-ref">{dossier.reference}</span>
                      <span
                        className={`dossier-status status-${dossier.status}`}
                      >
                        {dossier.status === "completed" && "✓ Terminé"}
                        {dossier.status === "in-progress" && "⏳ En cours"}
                        {dossier.status === "pending" && "📋 À traiter"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GestionEquipe;
