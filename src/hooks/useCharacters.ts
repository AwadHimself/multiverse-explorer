import { getCharacterById, getCharacters } from "@/services/character.service";
import { CharacterFilter } from "@/types/character.types";
import { useQuery } from "@tanstack/react-query";

export const useCharacters = (filters?: CharacterFilter) => {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => getCharacters(filters),
  });
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });
};
