export interface Card {
  id?: string;             // Optionnel, généré automatiquement par Firestore
  title: string;           // Titre affiché en haut
  subtitle: string;        // Sous-titre ou petit résumé
  excerpt: string;         // Texte d'accroche
  imageUrl: string;        // URL de l'illustration
  buttonText: string;      // Libellé du bouton (ex : "En savoir plus")
  targetSlug: string;      // Slug vers la page cible (ex : "suivi-psychologique")
  createdAt?: Date;        // (optionnel) pour trier si besoin
  updatedAt?: Date;        // (optionnel) pour tracking
}
