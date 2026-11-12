export async function chargerUtilisateurs(limite = 5, base = "https://dummyjson.com") {
  try {
    const response = await fetch(`${base}/users?limit=${limite}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.users.map(user => ({
      id: user.id,
      prenom: user.firstName,
      nom: user.lastName,
      email: user.email
    }));
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs:", error.message);
    return [];
  }
}

export async function chargerUtilisateur(id, base = "https://dummyjson.com") {
  try {
    const response = await fetch(`${base}/users/${id}`);
    if (response.status === 404) {
      console.log(`Utilisateur ${id} introuvable (404)`);
      return null;
    }
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const user = await response.json();
    return {
      id: user.id,
      prenom: user.firstName,
      nom: user.lastName,
      email: user.email
    };
  } catch (error) {
    console.error(`Erreur réseau ou autre pour l'utilisateur ${id}:`, error.message);
    return null;
  }
}
