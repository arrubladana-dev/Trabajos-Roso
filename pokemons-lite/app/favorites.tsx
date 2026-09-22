import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { useFavorites } from "../hooks/useFavorites";
import { PokemonListItem } from "../types/pokemon";

export default function FavoritesScreen() {
  const { favorites, loading: loadingFavs } = useFavorites();
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonListItem[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { width } = useWindowDimensions();

  const numColumns = width > 600 ? 3 : 2;

  const fetchFavoriteDetails = useCallback(async () => {
    if (loadingFavs) return;

    if (favorites.length === 0) {
      setFavoritePokemons([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const promises = favorites.map(async (name) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
        );
        const data = await response.json();
        return {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
          imageUrl:
            data.sprites.front_default ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        };
      });

      const results = await Promise.all(promises);
      setFavoritePokemons(results);
    } catch (error) {
      console.error("Error al cargar Pokémon favoritos:", error);
    } finally {
      setLoading(false);
    }
  }, [favorites, loadingFavs]);
  useFocusEffect(
    useCallback(() => {
      fetchFavoriteDetails();
    }, [fetchFavoriteDetails]),
  );

  if (loading || loadingFavs) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1561ee" />
      </View>
    );
  }

  if (favoritePokemons.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          ☆ No tienes Pokémon favoritos guardados aún.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={favoritePokemons}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  listPadding: {
    padding: 8,
  },
});
