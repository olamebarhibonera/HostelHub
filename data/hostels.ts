import { Hostel } from "@/models/hostel";
import { kenyanUniversities } from "./universities";

const images = [
  "https://images.unsplash.com/photo-1768355680597-c1650acb43cf?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1780367261684-4f65bcf2f128?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1775846588056-1dcc32a286d8?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1777651860821-c7b9aa00bf16?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1768355790603-fccf0058ddf8?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop&auto=format",
];

const baseAmenities = ["Wi-Fi", "24/7 Security", "Kitchen", "Laundry"];
const premiumAmenities = [...baseAmenities, "Gym", "Study Room", "CCTV", "Parking"];
const budgetAmenities = ["Wi-Fi", "24/7 Security", "Kitchen"];

type HostelTemplate = {
  suffix: string;
  price: number;
  type: string;
  distance: string;
  amenities: string[];
  featured?: boolean;
  rating: number;
};

const templates: HostelTemplate[] = [
  { suffix: "Student Residence", price: 8500, type: "Single Room", distance: "0.4 km", amenities: premiumAmenities, featured: true, rating: 4.8 },
  { suffix: "Campus Hostel", price: 5500, type: "Shared Room", distance: "0.8 km", amenities: budgetAmenities, rating: 4.3 },
  { suffix: "Scholars Lodge", price: 7200, type: "Single Room", distance: "1.1 km", amenities: baseAmenities, rating: 4.5 },
];

const areaNames: Record<string, string[]> = {
  Nairobi: ["Westlands", "Kilimani", "Parklands", "Ngara", "Upperhill", "South B", "Ruaraka"],
  Kiambu: ["Juja", "Thika", "Ruiru", "Githurai", "Kahawa"],
  Kisumu: ["Milimani", "Kisumu Central", "Riat", "Nyalenda"],
  Eldoret: ["Eldoret Town", "Langas", "Pioneer", "Elgon View"],
  Nakuru: ["Nakuru CBD", "Section 58", "Milimani", "Njoro"],
  Mombasa: ["Nyali", "Bamburi", "Mtwapa", "Mombasa Island"],
  Meru: ["Meru Town", "Nkubu", "Makutano"],
  Nyeri: ["Nyeri Town", "Karatina Road", "Kingongo"],
  Kakamega: ["Kakamega Town", "Lurambi", "Shirere"],
  Machakos: ["Machakos Town", "Mumbuni", "Kathiani"],
  default: ["Town Centre", "Campus Gate", "Main Road"],
};

function areaFor(city: string, index: number): string {
  const areas = areaNames[city] ?? areaNames.default;
  return `${areas[index % areas.length]}, ${city}`;
}

function buildHostelsForUniversity(uni: (typeof kenyanUniversities)[0], globalIndex: number): Hostel[] {
  return templates.map((t, i) => {
    const id = `${uni.id * 10 + i}`;
    const reviews = 40 + ((uni.id * 7 + i * 13) % 180);
    const beds = 6 + ((uni.id + i) % 14);
    return {
      id,
      name: `${uni.city} ${t.suffix}`,
      universityId: uni.id,
      universityName: uni.name,
      price: t.price + (uni.type === "Private" ? 500 : 0) + (i === 0 ? 0 : -800 * i),
      location: areaFor(uni.city, uni.id + i),
      rating: t.rating,
      reviews,
      image: images[(globalIndex + i) % images.length],
      description: `${t.suffix} near ${uni.name} in ${uni.city}, ${uni.county}. Safe, student-friendly accommodation with easy access to campus and local amenities.`,
      amenities: t.amenities,
      distance: `${t.distance} from ${uni.name}`,
      type: t.type,
      featured: t.featured && i === 0,
      availableBeds: beds,
      isVerified: uni.type === "Public" || i < 2,
    };
  });
}

export const hostels: Hostel[] = kenyanUniversities.flatMap((uni, index) =>
  buildHostelsForUniversity(uni, index)
);

export const amenityIcons: Record<string, string> = {
  "Wi-Fi": "📶",
  Gym: "🏋️",
  Laundry: "🧺",
  Kitchen: "🍳",
  "24/7 Security": "🔒",
  CCTV: "📹",
  "Study Room": "📚",
  Parking: "🅿️",
  Rooftop: "🌇",
  "En-suite": "🚿",
  Cafeteria: "🍽️",
  Library: "📖",
  "Co-working Space": "💼",
};

export function getHostelsByUniversity(universityId: number): Hostel[] {
  return hostels.filter((h) => h.universityId === universityId);
}

export function getHostelsByCity(city: string): Hostel[] {
  const uniIds = kenyanUniversities.filter((u) => u.city.toLowerCase() === city.toLowerCase()).map((u) => u.id);
  return hostels.filter((h) => uniIds.includes(h.universityId));
}

export function getHostelsNearLocation(universityId?: number, city?: string): Hostel[] {
  if (universityId) return getHostelsByUniversity(universityId);
  if (city) return getHostelsByCity(city);
  return hostels;
}
