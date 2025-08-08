export interface Tarif {
  id?: string;
  titre: string;
  prix: number;
  description: string;
}

export const defaultTarif = {
  id: '',
  titre: '',
  prix: 0,
  description: ''
}
