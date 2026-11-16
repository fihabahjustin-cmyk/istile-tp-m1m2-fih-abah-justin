// Arrondit un nombre à 2 décimales (11.575 donne 11.58)
function arrondir(nombre) {
  return Math.round(nombre * 100) / 100;
}

export function moyenneGenerale(liste) {
  if (!liste || liste.length === 0) return 0;
  const somme = liste.reduce((acc, { note }) => acc + note, 0);
  return arrondir(somme / liste.length);
}

export function admis(liste) {
  return liste.filter(({ note }) => note >= 10);
}

export function nomsFormates(liste) {
  return liste.map(({ nom, prenom }) => `${nom.toUpperCase()} ${prenom}`);
}

export function effectifParFiliere(liste) {
  return liste.reduce((acc, { filiere }) => {
    acc[filiere] = (acc[filiere] || 0) + 1;
    return acc;
  }, {});
}

export function moyenneParFiliere(liste) {
  const resultatsParFiliere = liste.reduce((acc, { filiere, note }) => {
    if (!acc[filiere]) {
      acc[filiere] = { somme: 0, count: 0 };
    }
    acc[filiere].somme += note;
    acc[filiere].count += 1;
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(resultatsParFiliere).map(([filiere, { somme, count }]) => [
      filiere,
      arrondir(somme / count)
    ])
  );
}

export function classementParNote(liste) {
  return [...liste].sort((a, b) => b.note - a.note);
}

export function majNote(liste, id, nouvelleNote) {
  return liste.map(etudiant => {
    if (etudiant.id === id) {
      return { ...etudiant, note: nouvelleNote };
    }
    return etudiant;
  });
}
