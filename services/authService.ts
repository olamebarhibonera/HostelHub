import { User } from "@/models/user";

let currentUser: User | null = null;
let isAuthenticated = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  getCurrentUser: () => currentUser,
  isAuthenticated: () => isAuthenticated,

  async login(email: string, password: string): Promise<boolean> {
    await delay(800);
    if (!email || !password || !email.includes("@") || password.length < 6) {
      return false;
    }
    const namePart = email.split("@")[0];
    currentUser = {
      id: `${Date.now()}`,
      email,
      firstName: namePart,
      lastName: "Student",
      phoneNumber: "+254712345678",
      university: "University of Nairobi",
      createdAt: new Date(),
      isEmailVerified: true,
    };
    isAuthenticated = true;
    return true;
  },

  async register(params: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    university: string;
  }): Promise<boolean> {
    await delay(800);
    const { email, password, confirmPassword, firstName, lastName, phoneNumber, university } = params;
    if (!email || !password || !firstName || !lastName) return false;
    if (!email.includes("@") || password.length < 6) return false;
    if (password !== confirmPassword) return false;
    if (phoneNumber.replace(/\D/g, "").length < 10) return false;

    currentUser = {
      id: `${Date.now()}`,
      email,
      firstName,
      lastName,
      phoneNumber,
      university,
      createdAt: new Date(),
      isEmailVerified: false,
    };
    isAuthenticated = true;
    return true;
  },

  async logout(): Promise<void> {
    await delay(500);
    currentUser = null;
    isAuthenticated = false;
  },

  async resetPassword(email: string): Promise<boolean> {
    await delay(600);
    return email.includes("@");
  },

  async updateProfile(updates: Partial<Pick<User, "firstName" | "lastName" | "phoneNumber" | "university">>): Promise<boolean> {
    await delay(500);
    if (!currentUser) return false;
    currentUser = { ...currentUser, ...updates };
    return true;
  },
};
