import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useFavorites } from "../../hooks/useFavorites";
import { usePokemonDetail } from "../../hooks/usePokemonDetails";

const PokemonDetailScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { pokemon, loading, error } = usePokemonDetail(name || "");
  const { isFavorite, toggleFavorite } = useFavorites();
  const { width } = useWindowDimensions();

  const tamañoImagen = width > 600 ? 200 : 150;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#156cee" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          No se pudo cargar la información del Pokémon.
        </Text>
      </View>
    );
  }

  const favorite = isFavorite(pokemon.name);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.favoriteButton, favorite && styles.favoriteActive]}
          onPress={() => toggleFavorite(pokemon.name)}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.favoriteText, favorite && styles.favoriteActiveText]}
          >
            {favorite ? "★ En Favoritos" : "☆ Añadir a Favoritos"}
          </Text>
        </TouchableOpacity>

        
        {pokemon.sprites.front_default && (
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: tamañoImagen, height: tamañoImagen }}
            resizeMode="contain"
          />
        )}
        <Text style={styles.title}>{pokemon.name}</Text>

        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Tipos: </Text>
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Altura: </Text>
            {pokemon.height / 10} m
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Peso: </Text>
            {pokemon.weight / 10} kg
          </Text>
        </View>

        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>Estadísticas base</Text>
          {pokemon.stats.map((s) => {
          
            const porcentaje = Math.min((s.base_stat / 180) * 100, 100);
            return (
              <View key={s.stat.name} style={styles.statRow}>
                <Text style={styles.statName}>{s.stat.name.toUpperCase()}</Text>

                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `${porcentaje}%` }]} />
                </View>

                <Text style={styles.statValue}>{s.base_stat}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#666",
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  cardContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  favoriteButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  favoriteActive: {
    backgroundColor: "#fff3cd",
    borderColor: "#ffc107",
  },
  favoriteText: {
    fontWeight: "bold",
    color: "#555",
    fontSize: 13,
  },
  favoriteActiveText: {
    color: "#856404",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginVertical: 8,
    color: "#222",
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
  },
  infoText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  bold: {
    fontWeight: "bold",
  },
  statsBox: {
    width: "100%",
    marginTop: 8,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#222",
    textAlign: "left",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  statName: {
    width: 100,
    fontSize: 12,
    color: "#555",
    fontWeight: "700",
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#153dee",
    borderRadius: 4,
  },
  statValue: {
    width: 35,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#153dee",
  },
});

export default PokemonDetailScreen;
