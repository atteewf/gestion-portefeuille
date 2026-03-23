import { useState } from "react";
import { DossierProvider } from "./context/DossierContext.jsx";
import DossierForm from "./components/DossierForm.jsx";
import DossierList from "./components/DossierList.jsx";
import GestionEquipe from "./components/GestionEquipe.jsx";
import "./App.css";

/**
 * Header avec switch de mode (Coordinateur / Contributeur)
 */
function Header({ mode, setMode }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>📂⚡ Gestion de Portefeuille</h1>
        <p className="subtitle">
          Système de suivi de dossiers avec alertes temporelles
        </p>
      </div>

      <div className="mode-switch">
        <button
          className={`mode-btn ${mode === "coordinateur" ? "active" : ""}`}
          onClick={() => setMode("coordinateur")}
        >
          👔 Coordinateur
        </button>
        <button
          className={`mode-btn ${mode === "contributeur" ? "active" : ""}`}
          onClick={() => setMode("contributeur")}
        >
          👨‍💼 Contributeur
        </button>
      </div>
    </header>
  );
}

function App() {
  const [mode, setMode] = useState("coordinateur");

  return (
    <DossierProvider>
      <div className="App">
        <Header mode={mode} setMode={setMode} />

        <main className="app-main">
          {mode === "coordinateur" && <DossierForm />}
          {mode === "contributeur" && <GestionEquipe />}
          <DossierList />
          <div className="legend">
            <h3>🚦 Système d'alerte (par journée) :</h3>
            <ul>
              <li>
                <span className="dot green"></span> Vert : &gt; 50% du temps
                restant dans la journée
              </li>
              <li>
                <span className="dot orange"></span> Orange : 20-50% du temps
                restant
              </li>
              <li>
                <span className="dot red"></span> Rouge : &lt; 20% du temps
                restant
              </li>
            </ul>
            <p className="legend-note">
              💡 Le feu tricolore se réinitialise chaque jour pour les dossiers
              multi-jours
            </p>
          </div>
        </main>
      </div>
    </DossierProvider>
  );
}

export default App;
