import { kenyanUniversities, University } from "./universities";

export interface Location {
  id: number;
  name: string;
  city: string;
  county?: string;
  country: string;
  type?: "Public" | "Private";
}

export const allLocations: Location[] = kenyanUniversities.map((u) => ({
  id: u.id,
  name: u.name,
  city: u.city,
  county: u.county,
  country: u.country,
  type: u.type,
}));

export const recentLocationIds = [1, 2, 14, 26, 34];

export function getLocationById(id: number): Location | undefined {
  return allLocations.find((l) => l.id === id);
}

export type { University };
