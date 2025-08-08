export interface SiteData {
  id?: string; // si tu veux identifier le document Firestore
  name: string;
  phone: string;
  email: string;
  address: string;
  adeli: string;
  speciality: string;
  headerImageUrl: string;
}

export const defaultSiteData: SiteData = {
  name: '',
  email: '',
  id: '',
  phone: '',
  address: '',
  adeli: '',
  speciality: '',
  headerImageUrl: ''
};

