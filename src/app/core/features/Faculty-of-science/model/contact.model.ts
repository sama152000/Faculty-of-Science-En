export interface ContactInfo {
  id: string;
  title: string;
  description: string;
  phone: string[];
  email: string[];
  address: string;
  officeHours: string;
  mapUrl?: string;
}

export interface StaffContact {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone?: string;
  officeLocation?: string;
  officeHours?: string;
  specialization?: string;
  image?: string;
}