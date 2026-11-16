import { readFile } from "node:fs/promises";
import {
  moyenneGenerale,
  admis,
  nomsFormates,
  effectifParFiliere,
  moyenneParFiliere,
  classementParNote,
  majNote
} from "./etudiants.js";
import { chargerUtilisateurs, chargerUtilisateur } from "./charger.js";

// Pas de connexion Internet ? Décommentez les deux lignes suivantes :
// import { simulerFetch } from "../outils/simulerFetch.js";
// globalThis.fetch = simulerFetch;

// ===== PARTIE D : traitements sur etudiants.json =====
const etudiants = JSON.parse(
  await readFile(new URL("../data/etudiants.json", import.meta.url), "utf8")
);

console.log("=== 1. Moyenne générale ===");
console.log(moyenneGenerale(etudiants));

console.log("\n=== 2. Étudiants admis (note >= 10) ===");
console.log(admis(etudiants));

console.log("\n=== 3. Noms formatés ===");
console.log(nomsFormates(etudiants));

console.log("\n=== 4. Effectif par filière ===");
console.log(effectifParFiliere(etudiants));

console.log("\n=== 5. Moyenne par filière ===");
console.log(moyenneParFiliere(etudiants));

console.log("\n=== 6. Classement par note ===");
const premierAvant = etudiants[0];
const classement = classementParNote(etudiants);
console.log(classement);

console.log("\n--- Preuve d'immutabilité 1 (classementParNote) ---");
console.log("Premier de la liste d'origine :", etudiants[0].prenom, etudiants[0].nom);
console.log("Premier de la liste d'origine inchangé :", etudiants[0] === premierAvant);
console.log("Premier du classement :", classement[0].prenom, classement[0].nom);
console.log("Ce sont deux tableaux différents :", etudiants !== classement);

console.log("\n=== 7. Modification d'une note (majNote) ===");
const etudiantOriginal = etudiants.find(({ id }) => id === 1);
const ancienneNote = etudiantOriginal.note;
const nouvelleListe = majNote(etudiants, 1, 18.5);
const etudiantModifie = nouvelleListe.find(({ id }) => id === 1);

console.log("--- Preuve d'immutabilité 2 (majNote) ---");
console.log("Ancien et nouvel objet sont différents :", etudiantOriginal !== etudiantModifie);
console.log("Note de l'ancien objet après majNote :", etudiantOriginal.note);
console.log("L'ancienne note n'a pas changé :", etudiantOriginal.note === ancienneNote);
console.log("Note du nouvel objet :", etudiantModifie.note);

// ===== PARTIE E : asynchronisme et API =====
console.log("\n=== SCÉNARIO 1 : succès, chargerUtilisateurs(3) ===");
console.log(await chargerUtilisateurs(3));

console.log("\n=== SCÉNARIO 2 : utilisateur inexistant, chargerUtilisateur(99999) ===");
console.log(await chargerUtilisateur(99999));

console.log("\n=== SCÉNARIO 3 : erreur réseau, hôte invalide ===");
console.log(await chargerUtilisateurs(3, "https://hote-invalide.exemple"));
