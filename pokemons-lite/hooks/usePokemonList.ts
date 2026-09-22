import { useState, useEffect } from "react";
import { PokemonListItem } from "../types/pokemon";

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchPokemonList = async () => {
        try {
            setLoading(true);
            setError(null);
        
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
        
        const data = await response.json();

        
        const formattedList: PokemonListItem[] = data.results.map(
            (item: { name: string; url: string }) => {
                const id = item.url.split("/").filter(Boolean).pop();
                return {
                name: item.name,
                url: item.url,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                };
            }
        );

        setPokemonList(formattedList);
        } catch (err: any) {
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    fetchPokemonList();
    }, []);

    return { pokemonList, loading, error };
};