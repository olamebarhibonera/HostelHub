import { Location } from "@/data/locations";
import { User } from "@/models/user";
import { authService } from "@/services/authService";
import { hostelService } from "@/services/hostelService";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface AppContextValue {
  user: User | null;
  favoriteIds: string[];
  location: Location | null;
  setLocation: (loc: Location | null) => void;
  toggleFavorite: (id: string) => void;
  refreshFavorites: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (params: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    university: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(hostelService.getFavoriteIds());
  const [location, setLocation] = useState<Location | null>(null);

  const refreshFavorites = useCallback(() => {
    setFavoriteIds(hostelService.getFavoriteIds());
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      hostelService.toggleFavorite(id);
      refreshFavorites();
    },
    [refreshFavorites]
  );

  const login = useCallback(async (email: string, password: string) => {
    const ok = await authService.login(email, password);
    if (ok) setUser(authService.getCurrentUser());
    return ok;
  }, []);

  const register = useCallback(
    async (params: {
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      university: string;
    }) => {
      const ok = await authService.register(params);
      if (ok) setUser(authService.getCurrentUser());
      return ok;
    },
    []
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      favoriteIds,
      location,
      setLocation,
      toggleFavorite,
      refreshFavorites,
      login,
      register,
      logout,
    }),
    [user, favoriteIds, location, toggleFavorite, refreshFavorites, login, register, logout]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
