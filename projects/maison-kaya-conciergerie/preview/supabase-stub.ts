// Aperçu uniquement : pas de base de données, l'envoi renvoie une erreur propre.
export const supabase = {
  from: () => ({ insert: async () => ({ error: new Error("Aperçu sans base de données") }) }),
};
