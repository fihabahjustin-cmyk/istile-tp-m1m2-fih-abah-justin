// Recherche d'un étudiant : les cartes se filtrent quand on tape dans le champ
// On peut chercher par prénom, par nom ou par filière

const champ = document.getElementById("champ-recherche");
const formulaire = document.querySelector("#recherche form");
const cartes = document.querySelectorAll("#etudiants .carte");
const resultat = document.getElementById("resultat");

// Met le texte en minuscules et enlève les accents : "Aïcha" devient "aicha"
function normaliser(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Une carte correspond si son prénom, son nom ou sa filière contient tous les mots tapés
function correspond(carte, mots) {
  const nom = carte.querySelector("h3").textContent;
  const filiere = carte.querySelector(".filiere").textContent;
  const texte = normaliser(`${nom} ${filiere}`);
  return mots.every((mot) => texte.includes(mot));
}

// Écrit le message sous le formulaire
function afficherResultat(nombre, mots, texteTape) {
  const s = nombre > 1 ? "s" : "";
  if (nombre === 0) {
    resultat.textContent = `Aucun étudiant ne correspond à « ${texteTape} ».`;
  } else if (mots.length === 0) {
    resultat.textContent = `${nombre} étudiants affichés`;
  } else {
    resultat.textContent = `${nombre} étudiant${s} trouvé${s}`;
  }
}

function rechercher() {
  const texteTape = champ.value.trim();
  const mots = normaliser(texteTape).split(" ").filter((mot) => mot !== "");
  const trouvees = Array.from(cartes).filter((carte) => correspond(carte, mots));

  cartes.forEach((carte) => {
    carte.hidden = !trouvees.includes(carte);
  });
  afficherResultat(trouvees.length, mots, texteTape);
}

// La recherche se met à jour à chaque lettre tapée
champ.addEventListener("input", rechercher);

// Le bouton "Rechercher" (ou la touche Entrée) lance aussi la recherche, sans recharger la page
formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  rechercher();
});
