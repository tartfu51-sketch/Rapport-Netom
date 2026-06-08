import { useState } from "react";

// ─── PALETTE & TOKENS ───────────────────────────────────────────────────────
const C = {
  bg:      "#080b12",
  panel:   "#0f1420",
  card:    "#141928",
  border:  "#1e2638",
  accent:  "#00c2ff",
  warn:    "#f59e0b",
  danger:  "#ef4444",
  ok:      "#22c55e",
  muted:   "#3a4560",
  text:    "#dde3f0",
  sub:     "#5a6a8a",
};

const TYPES_BATIMENT = [
  "Résidentiel collectif (copropriété)",
  "Résidentiel collectif (bailleur social)",
  "Maison individuelle",
  "Tertiaire – Bureaux",
  "Tertiaire – Commerce",
  "Tertiaire – Hôtel / Restauration",
  "ERP – École / Crèche",
  "ERP – Hôpital / Établissement de santé",
  "ERP – Équipement sportif",
  "ERP – Administration publique",
  "Industriel / Entrepôt",
];

const SECTIONS = [
  { id: "mission",       label: "Mission",         icon: "📋", color: "#00c2ff" },
  { id: "batiment",      label: "Bâtiment",        icon: "🏗️", color: "#7c3aed" },
  { id: "enveloppe",     label: "Enveloppe",       icon: "🧱", color: "#0891b2" },
  { id: "equipements",   label: "Équipements",     icon: "⚙️", color: "#d97706" },
  { id: "reglementaire", label: "Réglementaire",   icon: "📐", color: "#dc2626" },
  { id: "risques",       label: "Risques & Accès", icon: "⚠️", color: "#ea580c" },
  { id: "photos_notes",  label: "Photos & Notes",  icon: "📸", color: "#16a34a" },
  { id: "validation",    label: "Validation",      icon: "✅", color: "#0d9488" },
];

const INIT = {
  // MISSION
  ref_mission: "", date_visite: "", heure_arrivee: "", heure_depart: "",
  technicien: "", bet_nom: "", ingenieur_ref: "", tel_bet: "",
  type_mission: "Pré-audit énergétique", contexte_mission: "",

  // BÂTIMENT
  type_batiment: "Résidentiel collectif (copropriété)",
  nom_batiment: "", adresse: "", cp: "", ville: "",
  contact_site_nom: "", contact_site_tel: "", contact_site_qualite: "",
  annee_construction: "", annee_derniere_renovation: "",
  nb_niveaux_total: "", nb_niveaux_habites: "", nb_sous_sols: "",
  surface_plancher: "", surface_habitable: "", shon: "",
  nb_logements: "", nb_occupants_estimes: "", nb_bureaux: "",
  orientation_principale: "Nord", mitoyennete: "Isolé",
  classement_erp: "", capacite_erp: "",

  // ENVELOPPE
  murs_ext_type: "Béton banché",
  murs_ext_epaisseur: "", murs_ext_isolation: "Non",
  murs_ext_iso_type: "", murs_ext_iso_ep: "", murs_ext_iso_annee: "",
  murs_refend_type: "Béton", murs_refend_isolation: "Non",
  toiture_type: "Combles perdus", toiture_isolation: "Non",
  toiture_iso_type: "", toiture_iso_ep: "", toiture_iso_annee: "",
  plancher_bas_type: "Vide sanitaire", plancher_bas_isolation: "Non",
  plancher_inter_type: "Béton",
  vitrage_type: "Double vitrage standard", vitrage_rempla_annee: "",
  chassis_type: "PVC", chassis_etat: "Bon",
  etancheite_air: "Non testée", valeur_n50: "",
  pt_traitement: "Non traité",

  // ÉQUIPEMENTS
  ch_type: "Chaudière gaz collective",
  ch_energie: "Gaz naturel", ch_marque: "", ch_modele: "",
  ch_annee: "", ch_puissance: "", ch_rendement: "", ch_nb_chaudieres: "",
  ch_regulation: "Thermostat simple", ch_robinets_thermostatiques: "Non",
  ch_comptage_indiv: "Non",
  ecs_type: "Production collective", ecs_energie: "Gaz naturel",
  ecs_marque: "", ecs_annee: "", ecs_volume_ballon: "",
  ecs_boucle_retour: "Non", ecs_calorifugeage: "Non",
  vmc_type: "VMC Simple flux autoréglable", vmc_marque: "", vmc_annee: "",
  vmc_entretien_annee: "", vmc_etat: "Fonctionnel",
  eclairage_type: "Mixte LED / fluo", eclairage_detection: "Non",
  clim: "Non", clim_type: "", clim_annee: "",
  ascenseur: "Non", ascenseur_nb: "", ascenseur_annee: "",
  comptage_elec_type: "Compteur général", comptage_gaz: "Compteur général",

  // RÉGLEMENTAIRE
  dpe_existant: "Non", dpe_classe: "", dpe_annee: "",
  audit_precedent: "Non", audit_annee: "",
  conformite_rt: "Non vérifiée",
  amiante_dta: "Non", amiante_annee_dta: "", amiante_presence: "Non identifiée",
  plomb_crep: "Non", plomb_annee_crep: "",
  termites_zone: "Non", radon_zone: "1 – Faible",
  sismique_zone: "1 – Très faible", inondation_zone: "Non",
  argile_zone: "Faible",
  accessibilite_pmr: "Non conforme", accessibilite_observations: "",
  securite_incendie: "Non vérifiée",

  // RISQUES & ACCÈS
  acces_toiture: "Non", acces_toiture_type: "",
  acces_sous_sol: "Non", acces_sous_sol_type: "",
  acces_chaufferie: "Oui", acces_chaufferie_observations: "",
  acces_logements: "Partiel", nb_logements_visites: "",
  equipements_epi_requis: "Casque, chaussures sécu.",
  risque_amiante: "Non identifié",
  risque_electrique: "Non", risque_chute: "Non",
  observations_securite: "",

  // PHOTOS & NOTES
  nb_photos_prises: "", liste_zones_photographiees: "",
  notes_generales: "", points_attention: "",
  travaux_urgents: "Non", description_urgences: "",
  suite_a_donner: "",

  // VALIDATION
  visite_complete: "Oui", raison_visite_incomplete: "",
  signature_technicien: "", signature_contact_site: "",
  date_rapport: "",
};

// ─── COMPOSANTS UI ───────────────────────────────────────────────────────────
const Divider = ({ label, color = C.accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 12px" }}>
    <div style={{ height: 1, flex: 1, background: C.border }} />
    <span style={{ color, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>
      {label}
    </span>
    <div style={{ height: 1, flex: 1, background: C.border }} />
  </div>
);

const Badge = ({ text, color }) => (
  <span style={{
    background: color + "20", color, border: `1px solid ${color}40`,
    borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.08em"
  }}>{text}</span>
);

const Alert = ({ type, children }) => {
  const cfg = {
    warn:   { bg: "#f59e0b15", border: "#f59e0b40", color: "#f59e0b", icon: "⚠️" },
    info:   { bg: "#00c2ff15", border: "#00c2ff40", color: "#00c2ff", icon: "ℹ️" },
    danger: { bg: "#ef444415", border: "#ef444440", color: "#ef4444", icon: "🚨" },
  }[type] || cfg.info;
  return (
    <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 6, padding: "10px 12px", marginBottom: 14, display: "flex", gap: 8, alignItems: "flex-start" }}>
      <span style={{ fontSize: 14 }}>{cfg.icon}</span>
      <span style={{ color: cfg.color, fontSize: 12, lineHeight: 1.5 }}>{children}</span>
    </div>
  );
};

// ─── FIELD COMPONENT ─────────────────────────────────────────────────────────
function Field({ label, k, form, update, type = "text", options, rows, unit, required, hint }) {
  const val = form[k] ?? "";
  const isEmpty = required && !val;

  const baseInput = {
    width: "100%", boxSizing: "border-box",
    background: isEmpty ? "#1a0f0f" : C.card,
    border: `1px solid ${isEmpty ? "#7f1d1d" : C.border}`,
    color: C.text, borderRadius: 6, padding: "10px 12px",
    fontSize: 13, fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    outline: "none", transition: "border 0.2s",
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <label style={{ fontSize: 10, fontWeight: 800, color: isEmpty ? "#ef4444" : C.sub, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
        </label>
        {unit && <span style={{ fontSize: 10, color: C.muted, background: C.panel, padding: "1px 6px", borderRadius: 3 }}>{unit}</span>}
      </div>
      {hint && <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, fontStyle: "italic" }}>{hint}</div>}
      {options ? (
        <select style={baseInput} value={val} onChange={e => update(k, e.target.value)}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : rows ? (
        <textarea style={{ ...baseInput, resize: "vertical" }} rows={rows}
          value={val} onChange={e => update(k, e.target.value)} />
      ) : (
        <input style={baseInput} type={type} value={val}
          onChange={e => update(k, e.target.value)} />
      )}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────
function SectionMission({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  return (
    <>
      <Alert type="info">Remplir avant toute visite. Référence à indiquer sur tous les documents liés à cette mission.</Alert>
      <Divider label="Identification mission" color="#00c2ff" />
      <F k="ref_mission" label="Référence mission" required />
      <F k="type_mission" label="Type de mission" options={["Pré-audit énergétique", "Audit réglementaire Loi Élan", "ETR seul", "Pré-audit + ETR", "Visite de contrôle qualité", "Autre"]} required />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F k="date_visite" label="Date de visite" type="date" required />
        <F k="heure_arrivee" label="Heure arrivée" type="time" />
      </div>
      <F k="heure_depart" label="Heure de départ" type="time" />
      <F k="contexte_mission" label="Contexte / Objectif de la mission" rows={2}
        hint="Ex : Audit réglementaire copropriété >200 lots, obligation Loi Élan avant 2026" />

      <Divider label="Intervenant NETOM" color="#00c2ff" />
      <F k="technicien" label="Technicien terrain (NETOM)" required />

      <Divider label="Bureau d'études mandant" color="#00c2ff" />
      <F k="bet_nom" label="Nom du bureau d'études" required />
      <F k="ingenieur_ref" label="Ingénieur référent" required />
      <F k="tel_bet" label="Téléphone BET" type="tel" />
    </>
  );
}

function SectionBatiment({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  const isERP = form.type_batiment?.includes("ERP");
  const isTertiaire = form.type_batiment?.includes("Tertiaire");
  const isCollectif = form.type_batiment?.includes("collectif");

  return (
    <>
      <Divider label="Identification du bâtiment" color="#7c3aed" />
      <F k="type_batiment" label="Type de bâtiment" required
        options={TYPES_BATIMENT} />
      <F k="nom_batiment" label="Nom / dénomination" hint="Ex : Résidence Les Acacias, Immeuble Gambetta..." />
      <F k="adresse" label="Adresse" required />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
        <F k="cp" label="Code postal" required />
        <F k="ville" label="Ville" required />
      </div>

      <Divider label="Contact sur site" color="#7c3aed" />
      <F k="contact_site_nom" label="Nom du contact" required />
      <F k="contact_site_qualite" label="Qualité / Fonction"
        options={["Gardien / Concierge", "Syndic de copropriété", "Propriétaire", "Locataire", "Responsable technique", "Gestionnaire patrimoine", "Chef d'établissement", "Autre"]} />
      <F k="contact_site_tel" label="Téléphone contact" type="tel" />

      <Divider label="Caractéristiques générales" color="#7c3aed" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F k="annee_construction" label="Année construction" type="number" required />
        <F k="annee_derniere_renovation" label="Dernière rénovation" type="number" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <F k="nb_niveaux_total" label="Niveaux total" type="number" required />
        <F k="nb_niveaux_habites" label="Niveaux habités" type="number" />
        <F k="nb_sous_sols" label="Sous-sols" type="number" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F k="surface_plancher" label="Surface plancher" unit="m²" type="number" required />
        <F k="surface_habitable" label="Surface habitable" unit="m²" type="number" />
      </div>
      <F k="shon" label="SHON / SDP déclarée" unit="m²" type="number"
        hint="Surface hors œuvre nette — si connue du permis de construire" />

      {isCollectif && <F k="nb_logements" label="Nombre de logements" type="number" required />}
      {isTertiaire && <F k="nb_bureaux" label="Nombre de postes / locaux" type="number" />}
      {isERP && <>
        <F k="classement_erp" label="Classement ERP" options={["J", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "1ère cat.", "2ème cat.", "3ème cat.", "4ème cat.", "5ème cat."]} />
        <F k="capacite_erp" label="Capacité d'accueil ERP" type="number" />
      </>}
      <F k="nb_occupants_estimes" label="Occupants estimés" type="number" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F k="orientation_principale" label="Orientation façade principale"
          options={["Nord", "Nord-Est", "Est", "Sud-Est", "Sud", "Sud-Ouest", "Ouest", "Nord-Ouest"]} />
        <F k="mitoyennete" label="Mitoyenneté"
          options={["Isolé", "1 mur mitoyen", "2 murs mitoyens", "En bande"]} />
      </div>
    </>
  );
}

function SectionEnveloppe({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  return (
    <>
      <Alert type="info">Données utilisées pour le calcul des déperditions thermiques (méthode Th-BCE / NF EN 12831). Mesurer à défaut d'avoir les plans.</Alert>

      <Divider label="Murs extérieurs" color="#0891b2" />
      <F k="murs_ext_type" label="Composition" options={["Béton banché", "Béton cellulaire", "Brique pleine 22cm", "Brique creuse", "Brique monomur", "Parpaing nu", "Ossature bois", "Pierre de taille", "Pisé / Torchis", "Préfabriqué béton", "Autre"]} required />
      <F k="murs_ext_epaisseur" label="Épaisseur structure" unit="cm" type="number" required />
      <F k="murs_ext_isolation" label="Isolation" options={["Non", "ITI – Intérieure", "ITE – Extérieure", "Remplissage de lame", "Inconnue"]} required />
      {form.murs_ext_isolation !== "Non" && form.murs_ext_isolation !== "Inconnue" && <>
        <F k="murs_ext_iso_type" label="Nature isolant" options={["Laine de verre", "Laine de roche", "Polystyrène expansé (PSE)", "Polystyrène extrudé (XPS)", "Polyuréthane (PUR)", "Fibre de bois", "Ouate de cellulose", "Chanvre", "Inconnu"]} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <F k="murs_ext_iso_ep" label="Épaisseur isolant" unit="cm" type="number" />
          <F k="murs_ext_iso_annee" label="Année pose" type="number" />
        </div>
      </>}
      <F k="murs_refend_type" label="Murs refends / pignons" options={["Béton", "Brique", "Parpaing", "Bois", "Identique ext.", "Autre"]} />
      <F k="murs_refend_isolation" label="Isolation murs refends" options={["Non", "Oui", "Partielle", "Inconnue"]} />

      <Divider label="Toiture / Couverture" color="#0891b2" />
      <F k="toiture_type" label="Type" options={["Combles perdus accessibles", "Combles perdus inaccessibles", "Combles aménagés", "Toiture-terrasse inaccessible", "Toiture-terrasse accessible", "Toit incliné tuiles", "Toit incliné ardoises", "Bac acier", "Autre"]} required />
      <F k="toiture_isolation" label="Isolation" options={["Non", "Soufflée en vrac", "Rouleaux en plancher", "Panneaux sous rampants", "Sarking (sur chevrons)", "ITE toiture-terrasse", "Inconnue"]} required />
      {form.toiture_isolation !== "Non" && form.toiture_isolation !== "Inconnue" && <>
        <F k="toiture_iso_type" label="Nature isolant toiture" options={["Laine de verre", "Laine de roche", "Ouate de cellulose soufflée", "PSE", "XPS", "Polyuréthane", "Fibre de bois", "Chanvre", "Inconnu"]} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <F k="toiture_iso_ep" label="Épaisseur" unit="cm" type="number" />
          <F k="toiture_iso_annee" label="Année pose" type="number" />
        </div>
      </>}

      <Divider label="Plancher bas" color="#0891b2" />
      <F k="plancher_bas_type" label="Type" options={["Vide sanitaire ventilé", "Vide sanitaire non ventilé", "Terre-plein", "Sur sous-sol chauffé", "Sur sous-sol non chauffé", "Sur extérieur (pilotis)", "Autre"]} required />
      <F k="plancher_bas_isolation" label="Isolation" options={["Non", "Oui – sous plancher", "Oui – sur terre-plein", "Inconnue"]} />
      <F k="plancher_inter_type" label="Planchers intermédiaires" options={["Béton plein", "Béton précontraint", "Bois / Solives", "Mixte", "Autre"]} />

      <Divider label="Menuiseries & Vitrage" color="#0891b2" />
      <F k="vitrage_type" label="Type de vitrage" required
        options={["Simple vitrage (SV)", "Double vitrage standard (DV ≤ 1990)", "Double vitrage récent (DV > 2000)", "Double vitrage à faible émissivité", "Triple vitrage", "Mixte"]} />
      <F k="vitrage_rempla_annee" label="Année de remplacement" type="number" />
      <F k="chassis_type" label="Menuiseries – Matériau"
        options={["Bois", "PVC", "Aluminium sans rupture", "Aluminium avec rupture thermique", "Mixte", "Acier"]} />
      <F k="chassis_etat" label="État général menuiseries"
        options={["Très bon", "Bon", "Acceptable", "Dégradé", "Mauvais"]} />

      <Divider label="Perméabilité & Ponts thermiques" color="#0891b2" />
      <F k="etancheite_air" label="Test d'étanchéité à l'air"
        options={["Non testée", "Testée – résultat conforme", "Testée – résultat non conforme", "En cours"]} />
      {form.etancheite_air.includes("Testée") &&
        <F k="valeur_n50" label="Valeur n50 mesurée" unit="vol/h" type="number" hint="Valeur réglementaire : ≤ 0,6 vol/h (RE2020)" />}
      <F k="pt_traitement" label="Traitement des ponts thermiques"
        options={["Non traité", "Partiellement traité", "Traité ITE continue", "Non évalué"]}
        hint="Ponts thermiques : jonctions murs/planchers, refends, menuiseries" />
    </>
  );
}

function SectionEquipements({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  return (
    <>
      <Alert type="warn">Relevé précis obligatoire : marque, modèle, puissance, année. Ces données conditionnent les préconisations de remplacement.</Alert>

      <Divider label="Production de chaleur" color="#d97706" />
      <F k="ch_type" label="Type d'installation chauffage" required
        options={["Chaudière gaz collective", "Chaudière fioul collective", "Chaudière bois/granulés collective", "Pompe à chaleur collective", "Réseau de chaleur urbain", "Chaudière gaz individuelle", "Radiateurs électriques individuels", "PAC air/air individuelle", "Poêle à bois individuel", "Plancher chauffant", "Ventilo-convecteurs (FC)", "CTA / Batterie chaude", "Autre"]} />
      <F k="ch_energie" label="Énergie principale"
        options={["Gaz naturel", "Fioul domestique", "GPL", "Électricité", "Bois – bûches", "Bois – granulés", "Réseau de chaleur", "Géothermie", "Aérothermie", "Autre"]} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F k="ch_marque" label="Marque" />
        <F k="ch_modele" label="Modèle / Référence" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <F k="ch_annee" label="Année install." type="number" />
        <F k="ch_puissance" label="Puissance" unit="kW" type="number" />
        <F k="ch_rendement" label="Rendement" unit="%" type="number" />
      </div>
      <F k="ch_nb_chaudieres" label="Nombre de chaudières / unités" type="number" />
      <F k="ch_regulation" label="Régulation"
        options={["Thermostat simple", "Thermostat programmable", "Robinets thermostatiques (RTs)", "Régulation par sonde extérieure", "GTB / GTC", "Aucune"]} />
      <F k="ch_robinets_thermostatiques" label="Robinets thermostatiques" options={["Non", "Oui – tous", "Oui – partiels"]} />
      <F k="ch_comptage_indiv" label="Comptage individuel chaleur" options={["Non", "Oui – répartiteurs", "Oui – compteurs d'énergie", "En cours d'installation"]} />

      <Divider label="Eau Chaude Sanitaire" color="#d97706" />
      <F k="ecs_type" label="Type ECS" required
        options={["Production collective – chaudière", "Production collective – ballon solaire", "Ballon électrique individuel", "Chauffe-eau thermodynamique individuel", "Production semi-collective", "Instantané gaz individuel", "Mixte"]} />
      <F k="ecs_energie" label="Énergie ECS"
        options={["Gaz naturel", "Électricité", "Solaire thermique", "Fioul", "Réseau chaleur", "Autre"]} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F k="ecs_marque" label="Marque ballon / échangeur" />
        <F k="ecs_annee" label="Année install." type="number" />
      </div>
      <F k="ecs_volume_ballon" label="Volume ballon" unit="L" type="number" />
      <F k="ecs_boucle_retour" label="Boucle de retour ECS" options={["Non", "Oui", "Non accessible"]} />
      <F k="ecs_calorifugeage" label="Calorifugeage canalisations" options={["Non", "Oui – conforme", "Oui – dégradé", "Partiel"]} />

      <Divider label="Ventilation" color="#d97706" />
      <F k="vmc_type" label="Système de ventilation" required
        options={["VMC Simple flux autoréglable", "VMC Simple flux hygroréglable type A", "VMC Simple flux hygroréglable type B", "VMC Double flux avec échangeur", "VMC Gaz", "Ventilation naturelle par conduits", "Ventilation naturelle simple", "Aucune – ouvrants uniquement"]} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F k="vmc_marque" label="Marque centrale VMC" />
        <F k="vmc_annee" label="Année install." type="number" />
      </div>
      <F k="vmc_entretien_annee" label="Dernière date entretien" type="number" />
      <F k="vmc_etat" label="État constaté"
        options={["Fonctionnel", "Fonctionnel – entretien nécessaire", "Dysfonctionnement partiel", "Hors service", "Non contrôlable"]} />

      <Divider label="Éclairage & Autres usages" color="#d97706" />
      <F k="eclairage_type" label="Type éclairage majoritaire"
        options={["LED", "Fluo compacte", "Fluo tube T8", "Fluo tube T5", "Halogène", "Mixte LED / fluo", "Mixte ancien"]} />
      <F k="eclairage_detection" label="Détection de présence / minuteries" options={["Non", "Oui – parties communes", "Oui – tout le bâtiment"]} />
      <F k="clim" label="Climatisation" options={["Non", "Oui"]} />
      {form.clim === "Oui" && <>
        <F k="clim_type" label="Type climatisation"
          options={["Split mural individuel", "Multi-split", "VRV / VRF collectif", "CTA refroidissement", "Groupe froid + FC", "Autre"]} />
        <F k="clim_annee" label="Année install." type="number" />
      </>}
      <F k="ascenseur" label="Ascenseur" options={["Non", "Oui"]} />
      {form.ascenseur === "Oui" && <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <F k="ascenseur_nb" label="Nombre d'ascenseurs" type="number" />
          <F k="ascenseur_annee" label="Année install." type="number" />
        </div>
      </>}

      <Divider label="Comptage & Mesure" color="#d97706" />
      <F k="comptage_elec_type" label="Comptage électricité"
        options={["Compteur général", "Compteurs divisionnaires", "Compteurs Linky individuels", "Compteur général + sous-compteurs", "Inconnu"]} />
      <F k="comptage_gaz" label="Comptage gaz"
        options={["Compteur général", "Compteurs individuels", "Compteur Gazpar", "Pas de gaz", "Inconnu"]} />
    </>
  );
}

function SectionReglementaire({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  return (
    <>
      <Alert type="warn">Vérifier la présence physique des documents sur site. Photographier les diagnostics existants.</Alert>

      <Divider label="Diagnostics énergétiques existants" color="#dc2626" />
      <F k="dpe_existant" label="DPE existant disponible" options={["Non", "Oui"]} />
      {form.dpe_existant === "Oui" && <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <F k="dpe_classe" label="Classe DPE" options={["A", "B", "C", "D", "E", "F", "G"]} />
          <F k="dpe_annee" label="Année DPE" type="number" />
        </div>
      </>}
      <F k="audit_precedent" label="Audit énergétique antérieur" options={["Non", "Oui"]} />
      {form.audit_precedent === "Oui" && <F k="audit_annee" label="Année de l'audit" type="number" />}
      <F k="conformite_rt" label="Conformité réglementaire thermique"
        options={["Non vérifiée", "RT 2005 – conforme", "RT 2012 – conforme", "RE 2020 – conforme", "Antérieure RT 2005", "Non conforme – à préciser"]}
        hint="Se base sur l'année de dépôt du permis de construire" />

      <Divider label="Diagnostics sanitaires & risques" color="#dc2626" />
      <F k="amiante_dta" label="DTA (Dossier Technique Amiante) disponible" options={["Non", "Oui", "En cours"]} />
      {form.amiante_dta === "Oui" && <F k="amiante_annee_dta" label="Année DTA" type="number" />}
      <F k="amiante_presence" label="Présence amiante constatée"
        options={["Non identifiée", "Identifiée – état conservatoire", "Identifiée – travaux en cours", "Identifiée – retrait prévu", "À évaluer"]}
        hint="⚠️ Si amiante visible dégradée : arrêter la visite et alerter le BET" />
      <F k="plomb_crep" label="CREP (Constat Risque Plomb) disponible" options={["Non", "Oui", "Non applicable"]} />
      {form.plomb_crep === "Oui" && <F k="plomb_annee_crep" label="Année CREP" type="number" />}
      <F k="termites_zone" label="Zone termites" options={["Non", "Oui"]} />

      <Divider label="Zones réglementaires (CERFA ETR)" color="#dc2626" />
      <F k="radon_zone" label="Zone radon (IRSN)"
        options={["1 – Faible", "2 – Moyen", "3 – Élevé"]}
        hint="Vérifier sur georisques.gouv.fr selon code commune" />
      <F k="sismique_zone" label="Zone sismique"
        options={["1 – Très faible", "2 – Faible", "3 – Modérée", "4 – Moyenne", "5 – Forte"]} />
      <F k="inondation_zone" label="Zone inondation (PPRi)"
        options={["Non", "Zone A – aléa fort", "Zone B1 – aléa moyen fort", "Zone B2 – aléa moyen", "Zone C – aléa faible", "À vérifier"]} />
      <F k="argile_zone" label="Aléa retrait-gonflement argiles"
        options={["Faible", "Moyen", "Fort"]}
        hint="Vérifier sur infoterre.brgm.fr" />

      <Divider label="Accessibilité & Sécurité" color="#dc2626" />
      <F k="accessibilite_pmr" label="Accessibilité PMR"
        options={["Non conforme", "Conforme", "Partiellement conforme", "Non applicable", "Non vérifiée"]} />
      <F k="accessibilite_observations" label="Observations accessibilité" rows={2} />
      <F k="securite_incendie" label="Sécurité incendie"
        options={["Non vérifiée", "Conforme – visite commission récente", "Non conforme – observations", "Travaux en cours"]} />
    </>
  );
}

function SectionRisques({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  return (
    <>
      <Alert type="danger">Cette section conditionne les EPI à emporter. À remplir AVANT la visite puis mettre à jour pendant.</Alert>

      <Divider label="Accessibilité des zones" color="#ea580c" />
      <F k="acces_chaufferie" label="Accès chaufferie / local technique" options={["Oui", "Non", "Partiel"]} required />
      <F k="acces_chaufferie_observations" label="Observations accès chaufferie" rows={2} />
      <F k="acces_toiture" label="Accès toiture / combles" options={["Non", "Oui – escalier fixe", "Oui – trappe", "Oui – échelle", "Non accessible"]} />
      {form.acces_toiture !== "Non" && form.acces_toiture !== "Non accessible" &&
        <F k="acces_toiture_type" label="Détail accès toiture" />}
      <F k="acces_sous_sol" label="Accès sous-sol / vide sanitaire" options={["Non", "Oui – escalier", "Oui – trappe au sol", "Non accessible"]} />
      {form.acces_sous_sol !== "Non" && form.acces_sous_sol !== "Non accessible" &&
        <F k="acces_sous_sol_type" label="Détail accès sous-sol" />}
      <F k="acces_logements" label="Accès logements / locaux" options={["Complet", "Partiel", "Non"]} />
      {form.acces_logements !== "Non" &&
        <F k="nb_logements_visites" label="Nombre de logements/locaux visités" type="number" />}

      <Divider label="Risques identifiés" color="#ea580c" />
      <F k="risque_amiante" label="Risque amiante"
        options={["Non identifié", "Présence probable – à éviter", "Présence confirmée – zone interdite", "Matériaux amiantés identifiés mais non friables"]}
        hint="En cas de risque : ne pas intervenir sans autorisation BET" />
      <F k="risque_electrique" label="Risque électrique" options={["Non", "Local TGBT accessible", "Armoires ouvertes", "Installations dégradées"]} />
      <F k="risque_chute" label="Risque de chute" options={["Non", "Toiture sans garde-corps", "Planchers dégradés", "Combles étroits", "Échelle obligatoire"]} />
      <F k="observations_securite" label="Observations sécurité complémentaires" rows={3} />

      <Divider label="EPI requis" color="#ea580c" />
      <F k="equipements_epi_requis" label="Équipements EPI nécessaires"
        hint="Cocher / compléter selon les risques identifiés ci-dessus"
        rows={3} />
      <div style={{ background: "#1a0800", border: "1px solid #7c2d1240", borderRadius: 6, padding: 12, marginTop: 8 }}>
        <div style={{ color: "#f97316", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>RAPPEL EPI STANDARD NETOM</div>
        {["✅ Chaussures de sécurité S3", "✅ Casque de chantier", "✅ Gilet haute visibilité", "✅ Gants de manutention", "⚠️ Masque FFP2 si risque amiante", "⚠️ Harnais si accès toiture"].map(e => (
          <div key={e} style={{ color: "#9ca3af", fontSize: 11, lineHeight: 1.8 }}>{e}</div>
        ))}
      </div>
    </>
  );
}

function SectionPhotosNotes({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  return (
    <>
      <Divider label="Reportage photo" color="#16a34a" />
      <Alert type="info">Photographier systématiquement : façades (4 orientations), toiture, chaufferie, tableaux électriques, étiquettes équipements, défauts constatés.</Alert>
      <F k="nb_photos_prises" label="Nombre de photos prises" type="number" />
      <F k="liste_zones_photographiees" label="Zones photographiées" rows={3}
        hint="Ex : Façade Nord, Façade Sud, Toiture, Chaufferie (chaudière + brûleur), Local VMC, TGBT, Logements T1 R+2 et T3 R+4, Caves..." />

      <Divider label="Compte-rendu de visite" color="#16a34a" />
      <F k="notes_generales" label="Notes générales de visite" rows={4}
        hint="État général du bâtiment, ambiance, observations spontanées" />
      <F k="points_attention" label="Points d'attention particuliers" rows={3}
        hint="Éléments à signaler au BET en priorité" />
      <F k="travaux_urgents" label="Travaux urgents identifiés" options={["Non", "Oui"]} />
      {form.travaux_urgents === "Oui" &&
        <F k="description_urgences" label="Description des urgences" rows={3}
          hint="Ex : Fuite chaudière, corrosion avancée, tableau électrique hors normes..." />}
      <F k="suite_a_donner" label="Suite à donner / actions requises" rows={3}
        hint="Documents à demander, rendez-vous complémentaires, accès manquants..." />
    </>
  );
}

function SectionValidation({ form, update }) {
  const F = (props) => <Field {...props} form={form} update={update} />;
  const totalFields = Object.keys(INIT).length;
  const filled = Object.keys(form).filter(k => form[k] && form[k] !== "").length;
  const pct = Math.round((filled / totalFields) * 100);
  return (
    <>
      <div style={{ background: pct >= 80 ? "#052e1640" : "#1a0f0040", border: `1px solid ${pct >= 80 ? "#22c55e40" : "#f59e0b40"}`, borderRadius: 8, padding: 16, marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: pct >= 80 ? C.ok : C.warn }}>{pct}%</div>
        <div style={{ color: C.sub, fontSize: 12, marginTop: 4 }}>Formulaire complété ({filled}/{totalFields} champs)</div>
        {pct < 80 && <div style={{ color: C.warn, fontSize: 11, marginTop: 8 }}>⚠️ Recommandé : ≥ 80% avant validation</div>}
      </div>

      <Divider label="Complétion de la visite" color="#0d9488" />
      <F k="visite_complete" label="Visite complète" options={["Oui", "Non – partielle"]} required />
      {form.visite_complete !== "Oui" &&
        <F k="raison_visite_incomplete" label="Raison visite incomplète" rows={2}
          hint="Ex : Accès chaufferie refusé, logements inaccessibles, zone amiante..." />}
      <F k="date_rapport" label="Date de remise au BET" type="date" />

      <Divider label="Signatures" color="#0d9488" />
      <Alert type="info">Indiquer les noms en guise de signature. Une version avec signature manuscrite numérique sera disponible dans la version finale de l'app.</Alert>
      <F k="signature_technicien" label="Nom technicien NETOM (signature)" required />
      <F k="signature_contact_site" label="Nom contact site (signature)" />

      <div style={{ marginTop: 20, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16 }}>
        <div style={{ color: C.accent, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          ✅ Récapitulatif mission
        </div>
        {[
          ["Référence", form.ref_mission], ["Date", form.date_visite],
          ["Bâtiment", form.nom_batiment || form.adresse],
          ["BET", form.bet_nom], ["Technicien", form.technicien],
        ].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ color: C.sub, fontSize: 12 }}>{l}</span>
            <span style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{v || "—"}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── RAPPORT ─────────────────────────────────────────────────────────────────
function Rapport({ form }) {
  const Block = ({ title, color, children }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ background: color, padding: "5px 14px", fontWeight: 800, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", borderRadius: "4px 4px 0 0" }}>{title}</div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 6px 6px", padding: 14 }}>{children}</div>
    </div>
  );
  const R = ({ l, v }) => (
    <div style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ color: C.sub, fontSize: 11, flex: "0 0 150px" }}>{l}</span>
      <span style={{ color: C.text, fontSize: 11, fontWeight: 600 }}>{v || "—"}</span>
    </div>
  );
  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, #080b12, #0f1e35)`, padding: "20px 16px", borderBottom: `2px solid ${C.accent}`, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <div style={{ background: C.accent, color: "#000", fontWeight: 900, fontSize: 14, padding: "3px 10px", borderRadius: 3 }}>NETOM</div>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 13 }}>RAPPORT PRÉ-CHANTIER</div>
            <div style={{ color: C.sub, fontSize: 10 }}>État des lieux avant travaux — Confidentiel BET</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[["Réf.", form.ref_mission], ["Date", form.date_visite], ["Mission", form.type_mission], ["BET", form.bet_nom]].map(([l, v]) => (
            <div key={l} style={{ background: "#0d1117", borderRadius: 4, padding: "6px 10px" }}>
              <div style={{ color: C.accent, fontSize: 9, fontWeight: 800, textTransform: "uppercase" }}>{l}</div>
              <div style={{ color: C.text, fontSize: 11, fontWeight: 700 }}>{v || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      <Block title="1. Identification" color={C.accent}>
        <R l="Adresse" v={`${form.adresse}, ${form.cp} ${form.ville}`} />
        <R l="Type bâtiment" v={form.type_batiment} />
        <R l="Année construction" v={form.annee_construction} />
        <R l="Surface plancher" v={form.surface_plancher ? `${form.surface_plancher} m²` : ""} />
        <R l="Niveaux" v={form.nb_niveaux_total} />
        <R l="Contact site" v={`${form.contact_site_nom} – ${form.contact_site_qualite}`} />
        <R l="Technicien NETOM" v={form.technicien} />
        <R l="Ingénieur référent" v={form.ingenieur_ref} />
      </Block>

      <Block title="2. Enveloppe thermique" color="#0891b2">
        <R l="Murs ext. – type" v={form.murs_ext_type} />
        <R l="Murs ext. – épaisseur" v={form.murs_ext_epaisseur ? `${form.murs_ext_epaisseur} cm` : ""} />
        <R l="Murs ext. – isolation" v={form.murs_ext_isolation} />
        <R l="Toiture – type" v={form.toiture_type} />
        <R l="Toiture – isolation" v={form.toiture_isolation} />
        <R l="Plancher bas" v={form.plancher_bas_type} />
        <R l="Vitrage" v={form.vitrage_type} />
        <R l="Menuiseries" v={`${form.chassis_type} – ${form.chassis_etat}`} />
        <R l="Ponts thermiques" v={form.pt_traitement} />
        <R l="Étanchéité à l'air" v={form.etancheite_air} />
      </Block>

      <Block title="3. Équipements techniques" color="#d97706">
        <R l="Chauffage" v={`${form.ch_type} – ${form.ch_energie}`} />
        <R l="Marque / Modèle" v={`${form.ch_marque} ${form.ch_modele}`} />
        <R l="Puissance / Année" v={`${form.ch_puissance} kW – ${form.ch_annee}`} />
        <R l="Régulation" v={form.ch_regulation} />
        <R l="ECS" v={`${form.ecs_type} – ${form.ecs_energie}`} />
        <R l="VMC" v={`${form.vmc_type} – ${form.vmc_etat}`} />
        <R l="Climatisation" v={form.clim} />
        <R l="Ascenseur" v={form.ascenseur} />
      </Block>

      <Block title="4. Conformité réglementaire" color="#dc2626">
        <R l="DPE existant" v={form.dpe_existant === "Oui" ? `Classe ${form.dpe_classe} (${form.dpe_annee})` : "Non"} />
        <R l="Conformité RT" v={form.conformite_rt} />
        <R l="Amiante (DTA)" v={form.amiante_dta} />
        <R l="Plomb (CREP)" v={form.plomb_crep} />
        <R l="Zone radon" v={form.radon_zone} />
        <R l="Zone sismique" v={form.sismique_zone} />
        <R l="Zone inondation" v={form.inondation_zone} />
        <R l="Zone argile" v={form.argile_zone} />
        <R l="Accessibilité PMR" v={form.accessibilite_pmr} />
      </Block>

      <Block title="5. Risques & Accès" color="#ea580c">
        <R l="Accès chaufferie" v={form.acces_chaufferie} />
        <R l="Accès toiture" v={form.acces_toiture} />
        <R l="Accès logements" v={form.acces_logements} />
        <R l="Risque amiante" v={form.risque_amiante} />
        <R l="Risque électrique" v={form.risque_electrique} />
        {form.observations_securite && <div style={{ marginTop: 8, color: C.warn, fontSize: 11, background: "#1a0f00", padding: 8, borderRadius: 4 }}>{form.observations_securite}</div>}
      </Block>

      {(form.notes_generales || form.points_attention || form.travaux_urgents === "Oui") && (
        <Block title="6. Observations" color="#16a34a">
          {form.notes_generales && <><div style={{ color: C.accent, fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Notes générales</div><div style={{ color: C.text, fontSize: 11, lineHeight: 1.6, marginBottom: 8 }}>{form.notes_generales}</div></>}
          {form.points_attention && <><div style={{ color: C.warn, fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Points d'attention</div><div style={{ color: C.text, fontSize: 11, lineHeight: 1.6, marginBottom: 8 }}>{form.points_attention}</div></>}
          {form.travaux_urgents === "Oui" && form.description_urgences && <><div style={{ color: "#ef4444", fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>⚠️ Travaux urgents</div><div style={{ color: C.text, fontSize: 11, lineHeight: 1.6 }}>{form.description_urgences}</div></>}
        </Block>
      )}

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 14, textAlign: "center" }}>
        <div style={{ color: C.sub, fontSize: 10 }}>Pré-rapport établi par</div>
        <div style={{ color: C.accent, fontWeight: 800, fontSize: 13 }}>NETOM — {form.technicien || "Technicien terrain"}</div>
        <div style={{ color: C.sub, fontSize: 10, marginTop: 4 }}>À valider par {form.ingenieur_ref || form.bet_nom || "le bureau d'études"}</div>
        <div style={{ color: C.muted, fontSize: 9, marginTop: 6 }}>Ce document est un relevé terrain préliminaire. Il ne se substitue pas au rapport d'audit signé par l'ingénieur certifié.</div>
      </div>
    </div>
  );
}

// ─── APP PRINCIPALE ───────────────────────────────────────────────────────────
export default function PreChantier() {
  const [form, setForm] = useState(INIT);
  const [sec, setSec] = useState(0);
  const [view, setView] = useState("form");
  const [saved, setSaved] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pct = Math.round(
    Object.keys(INIT).filter(k => form[k] && form[k] !== "").length /
    Object.keys(INIT).length * 100
  );

  const renderSection = () => {
    const props = { form, update };
    switch (SECTIONS[sec].id) {
      case "mission":       return <SectionMission {...props} />;
      case "batiment":      return <SectionBatiment {...props} />;
      case "enveloppe":     return <SectionEnveloppe {...props} />;
      case "equipements":   return <SectionEquipements {...props} />;
      case "reglementaire": return <SectionReglementaire {...props} />;
      case "risques":       return <SectionRisques {...props} />;
      case "photos_notes":  return <SectionPhotosNotes {...props} />;
      case "validation":    return <SectionValidation {...props} />;
      default: return null;
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'IBM Plex Mono', 'Courier New', monospace", maxWidth: 500, margin: "0 auto" }}>

      {/* TOP BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: C.accent, color: "#000", fontWeight: 900, fontSize: 12, padding: "2px 8px", borderRadius: 3 }}>NETOM</div>
            <div>
              <div style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>PRÉ-CHANTIER</div>
              <div style={{ color: C.sub, fontSize: 9 }}>État des lieux avant travaux</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Badge text={`${pct}%`} color={pct >= 80 ? C.ok : pct >= 50 ? C.warn : C.danger} />
            <button onClick={() => setView(v => v === "form" ? "rapport" : "form")} style={{
              background: view === "rapport" ? C.accent : C.card, color: view === "rapport" ? "#000" : C.accent,
              border: `1px solid ${C.accent}`, borderRadius: 5, padding: "5px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer"
            }}>{view === "form" ? "📄 Rapport" : "✏️ Saisie"}</button>
            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{
              background: saved ? C.ok : C.card, color: saved ? "#fff" : C.sub,
              border: `1px solid ${C.border}`, borderRadius: 5, padding: "5px 8px", fontSize: 11, cursor: "pointer", transition: "all 0.3s"
            }}>{saved ? "✓" : "💾"}</button>
          </div>
        </div>
        <div style={{ height: 2, background: C.border }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.accent}, ${C.ok})`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {view === "rapport" ? (
        <div style={{ padding: "0 16px" }}><Rapport form={form} /></div>
      ) : (
        <>
          {/* SECTION TABS SCROLL */}
          <div style={{ overflowX: "auto", display: "flex", gap: 4, padding: "10px 16px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {SECTIONS.map((s, i) => (
              <button key={s.id} onClick={() => setSec(i)} style={{
                flexShrink: 0, padding: "6px 10px", borderRadius: 5, border: "none", cursor: "pointer",
                background: sec === i ? s.color : C.card,
                color: sec === i ? "#fff" : C.sub,
                fontSize: 10, fontWeight: 700, transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 4,
                boxShadow: sec === i ? `0 0 12px ${s.color}60` : "none"
              }}>
                <span>{s.icon}</span>
                <span style={{ whiteSpace: "nowrap" }}>{s.label}</span>
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div style={{ padding: "4px 16px 100px" }}>
            <div style={{ marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{SECTIONS[sec].icon}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: C.text }}>{SECTIONS[sec].label}</h2>
                <div style={{ color: C.sub, fontSize: 9 }}>Section {sec + 1} / {SECTIONS.length}</div>
              </div>
            </div>
            {renderSection()}
          </div>

          {/* BOTTOM NAV */}
          <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 500, background: C.bg, borderTop: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", gap: 8, boxSizing: "border-box" }}>
            <button onClick={() => setSec(Math.max(0, sec - 1))} disabled={sec === 0} style={{
              flex: 1, padding: "11px 0", background: sec === 0 ? C.panel : C.card,
              color: sec === 0 ? C.muted : C.text, border: `1px solid ${C.border}`,
              borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: sec === 0 ? "default" : "pointer"
            }}>← Préc.</button>
            {sec < SECTIONS.length - 1 ? (
              <button onClick={() => setSec(sec + 1)} style={{
                flex: 2, padding: "11px 0", background: SECTIONS[sec].color,
                color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 800, cursor: "pointer",
                boxShadow: `0 0 16px ${SECTIONS[sec].color}60`
              }}>Suivant : {SECTIONS[sec + 1].label} →</button>
            ) : (
              <button onClick={() => setView("rapport")} style={{
                flex: 2, padding: "11px 0", background: C.ok,
                color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 800, cursor: "pointer",
                boxShadow: `0 0 16px ${C.ok}60`
              }}>📄 Générer le rapport</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
