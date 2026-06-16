import { getHostelsByUniversity, hostels } from "@/data/hostels";
import { Hostel } from "@/models/hostel";

const favorites = new Set<string>();
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const hostelService = {
  async getAllHostels(): Promise<Hostel[]> {
    await delay(500);
    return hostels;
  },

  async searchHostels(query: string): Promise<Hostel[]> {
    await delay(500);
    if (!query.trim()) return hostels;
    const q = query.toLowerCase();
    return hostels.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.universityName.toLowerCase().includes(q)
    );
  },

  async getHostelById(id: string): Promise<Hostel | null> {
    await delay(300);
    return hostels.find((h) => h.id === id) ?? null;
  },

  async getTopRatedHostels(limit = 5): Promise<Hostel[]> {
    await delay(500);
    return [...hostels].sort((a, b) => b.rating - a.rating).slice(0, limit);
  },

  async getBudgetHostels(maxPrice = 6500): Promise<Hostel[]> {
    await delay(500);
    return hostels.filter((h) => h.price <= maxPrice);
  },

  async getHostelsByUniversity(universityId: number): Promise<Hostel[]> {
    await delay(300);
    return getHostelsByUniversity(universityId);
  },

  addToFavorites(hostelId: string) {
    favorites.add(hostelId);
  },

  removeFromFavorites(hostelId: string) {
    favorites.delete(hostelId);
  },

  toggleFavorite(hostelId: string) {
    if (favorites.has(hostelId)) {
      favorites.delete(hostelId);
    } else {
      favorites.add(hostelId);
    }
  },

  isFavorited(hostelId: string) {
    return favorites.has(hostelId);
  },

  async getFavorites(): Promise<Hostel[]> {
    await delay(300);
    return hostels.filter((h) => favorites.has(h.id));
  },

  getFavoriteIds(): string[] {
    return Array.from(favorites);
  },
};

// Seed default favorites (UoN + JKUAT featured hostels)
hostelService.addToFavorites("10");
hostelService.addToFavorites("140");
