import { useContext } from "react";
import { DossierContext } from "../context/DossierContext";
import DossierCard from "./DossierCard";

/* Liste de tous les dossiers avec filtres */
function DossierList() {
  const { dossiers } = useContext(DossierContext);

  if (dossiers.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 Aucun dossier en cours</p>
        <p className="hint">Créez votre premier dossier ci-dessus</p>
      </div>
    );
  }

  const sortedDossiers = [...dossiers].sort((a, b) => {
    const urgencyOrder = { red: 0, orange: 1, green: 2, expired: 3 };
    const urgencyA = calculateUrgency(a.deadline);
    const urgencyB = calculateUrgency(b.deadline);
    return urgencyOrder[urgencyA] - urgencyOrder[urgencyB];
  });

  return (
    <div className="dossier-list">
      <h2>📂 Dossiers actifs ({dossiers.length})</h2>
      <div className="dossier-grid">
        {sortedDossiers.map((dossier) => (
          <DossierCard key={dossier.id} dossier={dossier} />
        ))}
      </div>
    </div>
  );
}

function calculateUrgency(deadline) {
  const now = Date.now();
  const timeLeft = deadline - now;
  const totalTime = 7 * 24 * 60 * 60 * 1000; // 7 jours
  const percentLeft = (timeLeft / totalTime) * 100;

  if (timeLeft <= 0) return "expired";
  if (percentLeft > 50) return "green";
  if (percentLeft > 20) return "orange";
  return "red";
}

export default DossierList;
