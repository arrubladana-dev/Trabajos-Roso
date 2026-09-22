import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const FAVORITES_KEY = "@pokedex_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (pokemonName: string) => {
    try {
      let updatedFavorites: string[];
      if (favorites.includes(pokemonName)) {
        updatedFavorites = favorites.filter((name) => name !== pokemonName);
      } else {
        updatedFavorites = [...favorites, pokemonName];
      }
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
    } catch (error) {
      console.error("Error al guardar favorito:", error);
    }
  };

  const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);

  return { favorites, toggleFavorite, isFavorite, loading };
};
