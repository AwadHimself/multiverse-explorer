import { getCharacters } from "@/services/character.service";
import { CharacterFilter } from "@/types/character.types";
import { useQuery } from "@tanstack/react-query";

export const useCharacters = (filters?: CharacterFilter) => {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => getCharacters(filters),
  });
};
