import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#153dee",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Pokédex Lite",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/favorites" as any)}
              style={styles.headerButton}
            >
              <Text style={styles.headerButtonText}>★ Favoritos</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="pokemon/[name]"
        options={{
          title: "Detalle del Pokémon",
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          title: "Mis Favoritos",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
