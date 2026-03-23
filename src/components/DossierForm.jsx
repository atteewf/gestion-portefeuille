import { useState, useContext } from "react";
import { DossierContext } from "../context/DossierContext.jsx";

/* Formulaire de création de dossier */
function DossierForm() {
  const { addDossier } = useContext(DossierContext);

  const [reference, setReference] = useState("");
  const [typeDossier, setTypeDossier] = useState("standard");
  const [assignedTo, setAssignedTo] = useState("Équipe A");

  const typesDossiers = {
    express: { label: "Express (24h)", heures: 24 },
    standard: { label: "Standard (48h)", heures: 48 },
    etendu: { label: "Étendu (96h)", heures: 96 },
    exceptionnel: { label: "Exceptionnel (144h)", heures: 144 },
  };

  const actionsJournalieres = [
    { id: 1, label: "Contact superviseur", done: false },
    { id: 2, label: "Vérification conformité", done: false },
    { id: 3, label: "Mise à jour statut", done: false },
    { id: 4, label: "Transmission rapport", done: false },
    { id: 5, label: "Validation étape", done: false },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reference.trim()) {
      alert("La référence est obligatoire");
      return;
    }

    const heures = typesDossiers[typeDossier].heures;
    const deadline = Date.now() + heures * 60 * 60 * 1000;

    addDossier(
      reference,
      typeDossier,
      deadline,
      actionsJournalieres,
      assignedTo,
    );

    setReference("");
    setTypeDossier("standard");
    setAssignedTo("Équipe A");
  };

  return (
    <div className="dossier-form">
      <h2>📁 Nouveau Dossier</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Référence :</label>
          <input
            type="text"
            placeholder="Ex: #2024-001"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Type de dossier :</label>
          <select
            value={typeDossier}
            onChange={(e) => setTypeDossier(e.target.value)}
          >
            {Object.entries(typesDossiers).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Assigné à :</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option>Équipe A</option>
            <option>Équipe B</option>
            <option>Service C</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Créer le dossier
        </button>
      </form>
    </div>
  );
}

export default DossierForm;
