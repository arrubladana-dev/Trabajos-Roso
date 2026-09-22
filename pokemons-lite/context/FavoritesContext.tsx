import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const FAVORITES_KEY = "@pokemon_favorites";

interface FavoritesContextData {
  favorites: string[];
  addFavorite: (name: string) => Promise<void>;
  removeFavorite: (name: string) => Promise<void>;
  isFavorite: (name: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error al cargar favoritos", e);
    }
  };

  const saveFavorites = async (items: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
      setFavorites(items);
    } catch (e) {
      console.error("Error al guardar favoritos", e);
    }
  };

  const addFavorite = async (name: string) => {
    if (!favorites.includes(name)) {
      const updated = [...favorites, name];
      await saveFavorites(updated);
    }
  };

  const removeFavorite = async (name: string) => {
    const updated = favorites.filter((fav) => fav !== name);
    await saveFavorites(updated);
  };

  const isFavorite = (name: string) => favorites.includes(name);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
