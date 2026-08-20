import { api } from "@/api/api";
import {
  Character,
  CharacterFilter,
  CharacterListResponse,
} from "@/types/character.types";

export const getCharacters = async (
  filters?: CharacterFilter,
): Promise<CharacterListResponse> => {
  const response = await api.get<CharacterListResponse>("/character", {
    params: filters,
  });

  return response.data;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`);

  return response.data;
};
