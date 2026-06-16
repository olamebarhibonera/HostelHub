export interface Hostel {
  id: string;
  name: string;
  universityId: number;
  universityName: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  amenities: string[];
  distance: string;
  type: string;
  featured?: boolean;
  availableBeds: number;
  isVerified: boolean;
}
