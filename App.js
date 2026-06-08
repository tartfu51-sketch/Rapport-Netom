import { useState } from "react";
import PreChantier from "./forms/PreChantier";

const C = {
  bg: "#080b12", panel: "#0f1420", card: "#141928",
  border: "#1e2638", accent: "#00c2ff", text: "#dde3f0", sub: "#5a6a8a",
};

const FORMS = [
  { id: "prechantier",  label: "Pré-chantier",       icon: "🔍", color: "#00c2ff", component: PreChantier, ready: true },
  { id: "postchantier", label: "Post-chantier",       icon: "✅", color: "#22c55e", component: null, ready: false },
  { id: "dim_chauffage",label: "Dimensionnement Chauffage", icon: "🔥", color: "#ef4444", component: null, ready: false },
  { id: "dim_froid",    label: "Dimensionnement Froid",     icon: "❄️", color: "#6366f1", component: null, ready: false },
  { id: "etr",          label: "Pré-audit ETR",       icon: "⚡", color: "#f59e0b", component: null, ready: false },
];

export default function App() {
  const [current, setCurrent] = useState(null);

  if (current) {
    const F = FORMS.find(f => f.id === current);
    const Comp = F.component;
    return (
      <div>
        <button onClick={() => setCurrent(null)} style={{
          position: "fixed", top: 12, left: 12, zIndex: 999,
          background: "#1e2638", color: "#dde3f0", border: "1px solid #2a3a55",
          borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer"
        }}>← Accueil</button>
        <Comp />
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'IBM Plex Mono', monospace", maxWidth: 500, margin: "0 auto", padding: "0 0 40px" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, #080b12, #0f1e35)`, padding: "32px 20px 24px", borderBottom: `2px solid ${C.accent}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ background: C.accent, color: "#000", fontWeight: 900, fontSize: 22, padding: "6px 14px", borderRadius: 5, letterSpacing: "-1px" }}>
            NETOM
          </div>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 16 }}>Terrain App</div>
            <div style={{ color: C.sub, fontSize: 10 }}>Assistant Bureau d'Études · Audit Énergétique & ETR</div>
          </div>
        </div>
        <div style={{ background: "#0d1525", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ color: C.sub, fontSize: 10, lineHeight: 1.7 }}>
            📍 Formulaires terrain conformes aux exigences BET<br/>
            📄 Génération automatique de pré-rapports<br/>
            📱 Optimisé mobile · Fonctionne hors-ligne
          </div>
        </div>
      </div>

      {/* FORMULAIRES */}
      <div style={{ padding: "24px 16px" }}>
        <div style={{ color: C.sub, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
          Formulaires disponibles
        </div>

        {FORMS.map(f => (
          <button key={f.id} onClick={() => f.ready && setCurrent(f.id)} style={{
            width: "100%", background: f.ready ? C.card : C.panel,
            border: `1px solid ${f.ready ? f.color + "40" : C.border}`,
            borderRadius: 10, padding: "16px", marginBottom: 10,
            cursor: f.ready ? "pointer" : "default",
            textAlign: "left", transition: "all 0.2s",
            opacity: f.ready ? 1 : 0.5,
            boxShadow: f.ready ? `0 0 20px ${f.color}15` : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 24 }}>{f.icon}</div>
                <div>
                  <div style={{ color: f.ready ? C.text : C.sub, fontWeight: 800, fontSize: 14 }}>{f.label}</div>
                  <div style={{ color: C.sub, fontSize: 10, marginTop: 2 }}>
                    {f.ready ? "Disponible · Appuyer pour ouvrir" : "En cours de développement"}
                  </div>
                </div>
              </div>
              <div style={{
                background: f.ready ? f.color + "20" : C.border,
                color: f.ready ? f.color : C.sub,
                border: `1px solid ${f.ready ? f.color + "40" : C.border}`,
                borderRadius: 4, padding: "3px 8px", fontSize: 9, fontWeight: 800, textTransform: "uppercase"
              }}>
                {f.ready ? "PRÊT" : "BIENTÔT"}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "0 16px", textAlign: "center" }}>
        <div style={{ color: C.sub, fontSize: 9, lineHeight: 1.8 }}>
          NETOM – Assistant de Bureau d'Études<br/>
          Audit Énergétique & ETR · v1.0
        </div>
      </div>
    </div>
  );
}
