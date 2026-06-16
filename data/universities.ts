export interface University {
  id: number;
  name: string;
  city: string;
  county: string;
  country: string;
  type: "Public" | "Private";
}

export const kenyanUniversities: University[] = [
  // Nairobi & environs
  { id: 1, name: "University of Nairobi", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Public" },
  { id: 2, name: "Kenyatta University", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Public" },
  { id: 3, name: "Strathmore University", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 4, name: "USIU-Africa", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 5, name: "Technical University of Kenya", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Public" },
  { id: 6, name: "Multimedia University of Kenya", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Public" },
  { id: 7, name: "Cooperative University of Kenya", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Public" },
  { id: 8, name: "Catholic University of Eastern Africa", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 9, name: "Daystar University", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 10, name: "Riara University", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 11, name: "KCA University", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 12, name: "Zetech University", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 13, name: "Africa Nazarene University", city: "Kajiado", county: "Kajiado", country: "Kenya", type: "Private" },
  { id: 14, name: "JKUAT", city: "Juja", county: "Kiambu", country: "Kenya", type: "Public" },
  { id: 15, name: "Mount Kenya University", city: "Thika", county: "Kiambu", country: "Kenya", type: "Private" },
  { id: 16, name: "Pan Africa Christian University", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 17, name: "Nairobi Institute of Business Studies", city: "Nairobi", county: "Nairobi", country: "Kenya", type: "Private" },
  { id: 18, name: "Umma University", city: "Kajiado", county: "Kajiado", country: "Kenya", type: "Private" },

  // Central Kenya
  { id: 19, name: "Dedan Kimathi University of Technology", city: "Nyeri", county: "Nyeri", country: "Kenya", type: "Public" },
  { id: 20, name: "Karatina University", city: "Karatina", county: "Nyeri", country: "Kenya", type: "Public" },
  { id: 21, name: "Kirinyaga University", city: "Kerugoya", county: "Kirinyaga", country: "Kenya", type: "Public" },
  { id: 22, name: "Murang'a University of Technology", city: "Murang'a", county: "Murang'a", country: "Kenya", type: "Public" },
  { id: 23, name: "Chuka University", city: "Chuka", county: "Tharaka-Nithi", country: "Kenya", type: "Public" },
  { id: 24, name: "Embu University", city: "Embu", county: "Embu", country: "Kenya", type: "Public" },
  { id: 25, name: "Laikipia University", city: "Nyahururu", county: "Laikipia", country: "Kenya", type: "Public" },

  // Rift Valley
  { id: 26, name: "Moi University", city: "Eldoret", county: "Uasin Gishu", country: "Kenya", type: "Public" },
  { id: 27, name: "University of Eldoret", city: "Eldoret", county: "Uasin Gishu", country: "Kenya", type: "Public" },
  { id: 28, name: "Egerton University", city: "Njoro", county: "Nakuru", country: "Kenya", type: "Public" },
  { id: 29, name: "Kabarak University", city: "Nakuru", county: "Nakuru", country: "Kenya", type: "Private" },
  { id: 30, name: "Maasai Mara University", city: "Narok", county: "Narok", country: "Kenya", type: "Public" },
  { id: 31, name: "University of Kabianga", city: "Kericho", county: "Kericho", country: "Kenya", type: "Public" },
  { id: 32, name: "Machakos University", city: "Machakos", county: "Machakos", country: "Kenya", type: "Public" },
  { id: 33, name: "South Eastern Kenya University", city: "Kitui", county: "Kitui", country: "Kenya", type: "Public" },

  // Western & Nyanza
  { id: 34, name: "Maseno University", city: "Kisumu", county: "Kisumu", country: "Kenya", type: "Public" },
  { id: 35, name: "Masinde Muliro University", city: "Kakamega", county: "Kakamega", country: "Kenya", type: "Public" },
  { id: 36, name: "Jaramogi Oginga Odinga University", city: "Bondo", county: "Siaya", country: "Kenya", type: "Public" },
  { id: 37, name: "Great Lakes University of Kisumu", city: "Kisumu", county: "Kisumu", country: "Kenya", type: "Private" },
  { id: 38, name: "Kibabii University", city: "Bungoma", county: "Bungoma", country: "Kenya", type: "Public" },
  { id: 39, name: "Rongo University", city: "Rongo", county: "Migori", country: "Kenya", type: "Public" },
  { id: 40, name: "Alupe University", city: "Busia", county: "Busia", country: "Kenya", type: "Public" },
  { id: 41, name: "Kisii University", city: "Kisii", county: "Kisii", country: "Kenya", type: "Public" },

  // Eastern & Coast
  { id: 42, name: "Meru University of Science and Technology", city: "Meru", county: "Meru", country: "Kenya", type: "Public" },
  { id: 43, name: "Kenya Methodist University", city: "Meru", county: "Meru", country: "Kenya", type: "Private" },
  { id: 44, name: "Technical University of Mombasa", city: "Mombasa", county: "Mombasa", country: "Kenya", type: "Public" },
  { id: 45, name: "Pwani University", city: "Kilifi", county: "Kilifi", country: "Kenya", type: "Public" },
  { id: 46, name: "Taita Taveta University", city: "Voi", county: "Taita-Taveta", country: "Kenya", type: "Public" },
  { id: 47, name: "Scott Christian University", city: "Machakos", county: "Machakos", country: "Kenya", type: "Private" },

  // Northern & other
  { id: 48, name: "Garissa University", city: "Garissa", county: "Garissa", country: "Kenya", type: "Public" },
  { id: 49, name: "Turkana University College", city: "Lodwar", county: "Turkana", country: "Kenya", type: "Public" },
  { id: 50, name: "Kenya Highlands Evangelical University", city: "Kericho", county: "Kericho", country: "Kenya", type: "Private" },
];

export function getUniversityById(id: number): University | undefined {
  return kenyanUniversities.find((u) => u.id === id);
}

export function getUniversitiesByCounty(county: string): University[] {
  return kenyanUniversities.filter((u) => u.county.toLowerCase() === county.toLowerCase());
}
