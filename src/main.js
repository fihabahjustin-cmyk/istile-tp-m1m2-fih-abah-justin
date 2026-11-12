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

// Décommentez les lignes ci-dessous en cas d'absence de connexion Internet :
// import { simulerFetch } from "../outils/simulerFetch.js";
// globalThis.fetch = simulerFetch;

// --- EXÉCUTION PARTIE D ---
const etudiants = JSON.parse(
  await readFile(new URL("../data/etudiants.json", import.meta.url), "utf8")
);

console.log("=== 1. Moyenne Générale ===");
console.log(moyenneGenerale(etudiants));

console.log("\n=== 2. Étudiants Admis ===");
console.log(admis(etudiants));

console.log("\n=== 3. Noms Formatés ===");
console.log(nomsFormates(etudiants));

console.log("\n=== 4. Effectif par Filière ===");
console.log(effectifParFiliere(etudiants));

console.log("\n=== 5. Moyenne par Filière ===");
console.log(moyenneParFiliere(etudiants));

console.log("\n=== 6. Classement par Note ===");
const classement = classementParNote(etudiants);
console.log(classement);

console.log("\n--- Preuve d'immutabilité 1 ---");
console.log("Note originale du 1er :", etudiants[0].note);
console.log("Note triée du 1er :", classement[0].note);
console.log("Tableaux distincts :", etudiants !== classement);

console.log("\n=== 7. Modification de note (majNote) ===");
const etudiantOriginal = etudiants.find(e => e.id === 1);
const ancienneNote = etudiantOriginal.note;
const nouvelleListe = majNote(etudiants, 1, 18.5);
const etudiantModifie = nouvelleListe.find(e => e.id === 1);

console.log("--- Preuve d'immutabilité 2 ---");
console.log("Objets différents :", etudiantOriginal !== etudiantModifie);
console.log("Ancienne note inchangée :", ancienneNote);
console.log("Nouvelle note :", etudiantModifie.note);

// --- EXÉCUTION PARTIE E ---
console.log("\n=== SCÉNARIO 1 : Succès chargerUtilisateurs(3) ===");
const res1 = await chargerUtilisateurs(3);
console.log(res1);

console.log("\n=== SCÉNARIO 2 : Utilisateur inexistant chargerUtilisateur(99999) ===");
const res2 = await chargerUtilisateur(99999);
console.log(res2);

console.log("\n=== SCÉNARIO 3 : Erreur réseau chargerUtilisateurs(3, hote-invalide) ===");
const res3 = await chargerUtilisateurs(3, "https://hote-invalide.exemple");
console.log(res3);
