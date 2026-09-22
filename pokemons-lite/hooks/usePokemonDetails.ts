import { useEffect, useState } from "react";
import { PokemonDetail } from "../types/pokemon";

export const usePokemonDetail = (name: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
        );

        if (!response.ok) {
          throw new Error("No se pudo obtener el detalle del Pokémon");
        }

        const data: PokemonDetail = await response.json();
        setPokemon(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [name]);

  return { pokemon, loading, error };
};
