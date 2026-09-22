import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { PokemonListItem } from "../types/pokemon";
import { useFavorites } from "../hooks/useFavorites";

interface PokemonCardProps {
    pokemon: PokemonListItem;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const router = useRouter();
    const { isFavorite } = useFavorites();
    const favorite = isFavorite(pokemon.name);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/pokemon/${pokemon.name}` as any)}
            activeOpacity={0.7}
        >
        {favorite && (
        <View style={styles.badge}>
            <Text style={styles.badgeText}>★</Text>
        </View>
        )}

        {pokemon.imageUrl ? (
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
        ) : null}

        <Text style={styles.name}>{pokemon.name}</Text>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        padding: 12,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        position: "relative", 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    badge: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#fff3cd",
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 1,
    },
    badgeText: {
        color: "#ffc107",
        fontSize: 14,
        fontWeight: "bold",
    },
    image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    },
    name: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "capitalize",
        color: "#333",
    },
});