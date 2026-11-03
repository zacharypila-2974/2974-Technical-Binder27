// 1) Paste your Cloudflare Worker URL (see README).
const TOKEN_URL = "https://YOUR-WORKER.YOUR-NAME.workers.dev/";

// 2) Paste each model's URN (see README). Leave "" until you have it.
const MODELS = {
  robot:      { title: "2026 Oasis: Full Assembly", desc: "Complete competition robot with all subsystems integrated.", tags: ["Frame","Drivetrain","All subsystems"], urn: "" },
  subsystems: [
    { title: "Drivetrain", desc: "Swerve modules and chassis frame.",   tags: ["Swerve","Frame"],   urn: "" },
    { title: "Intake",     desc: "Game piece acquisition mechanism.",   tags: ["Rollers","Pivot"],  urn: "" },
    { title: "Shooter",    desc: "Scoring mechanism for game pieces.",  tags: ["Flywheel","Hood"],  urn: "" },
    { title: "Climber",    desc: "Endgame climbing mechanism.",         tags: ["Winch","Hooks"],    urn: "" }
  ],
  offseason: [
    { title: "Offseason Project 1", desc: "Short description of the project goal.", tags: ["Prototype","Year"], urn: "" },
    { title: "Offseason Project 2", desc: "Short description of the project goal.", tags: ["Prototype","Year"], urn: "" },
    { title: "Offseason Project 3", desc: "Short description of the project goal.", tags: ["Prototype","Year"], urn: "" }
  ]
};
