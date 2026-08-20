import { api } from "@/api/api";
import {
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
