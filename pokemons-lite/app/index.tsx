import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { usePokemonList } from "../hooks/usePokemonList";

const HomeScreen = () => {
  const { pokemonList, loading, error } = usePokemonList();
  const { width } = useWindowDimensions();

  const numColumns = width > 600 ? 3 : 2;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Error al cargar la lista de Pokémon.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns} 
        data={pokemonList}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  listPadding: {
    padding: 8,
  },
});

export default HomeScreen;
