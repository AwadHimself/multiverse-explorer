import { api } from "@/api/api";
import { Episode, EpisodesResponse } from "@/types/episode.types";

export const getEpisodes = async (episodeIds: number[]): Promise<Episode[]> => {
  if (!episodeIds.length) {
    return [];
  }

  const response = await api.get<EpisodesResponse>(
    `/episode/${episodeIds.join(",")}`,
  );

  return Array.isArray(response.data) ? response.data : [response.data];
};
