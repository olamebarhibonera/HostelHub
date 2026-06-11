export interface Location {
  id: number;
  name: string;
  city: string;
  country: string;
}

export const allLocations: Location[] = [
  { id: 1, name: "University of Nairobi", city: "Nairobi", country: "Kenya" },
  { id: 2, name: "Kenyatta University", city: "Nairobi", country: "Kenya" },
  { id: 3, name: "Strathmore University", city: "Nairobi", country: "Kenya" },
  { id: 4, name: "USIU-Africa", city: "Nairobi", country: "Kenya" },
  { id: 5, name: "Makerere University", city: "Kampala", country: "Uganda" },
  { id: 6, name: "University of Dar es Salaam", city: "Dar es Salaam", country: "Tanzania" },
  { id: 7, name: "University of Ghana", city: "Accra", country: "Ghana" },
  { id: 8, name: "University of Cape Town", city: "Cape Town", country: "South Africa" },
  { id: 9, name: "Addis Ababa University", city: "Addis Ababa", country: "Ethiopia" },
  { id: 10, name: "University of Lagos", city: "Lagos", country: "Nigeria" },
  { id: 11, name: "Moi University", city: "Eldoret", country: "Kenya" },
  { id: 12, name: "Egerton University", city: "Nakuru", country: "Kenya" },
  { id: 13, name: "Maseno University", city: "Kisumu", country: "Kenya" },
  { id: 14, name: "Technical University of Mombasa", city: "Mombasa", country: "Kenya" },
  { id: 15, name: "Dedan Kimathi University", city: "Nyeri", country: "Kenya" },
];

export const recentLocationIds = [1, 2, 5];
