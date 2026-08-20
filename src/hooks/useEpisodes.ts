import { useQuery } from "@tanstack/react-query";

import { getEpisodes } from "@/services/episode.service";

export const useEpisodes = (episodeIds: number[]) => {
  return useQuery({
    queryKey: ["episodes", episodeIds],
    queryFn: () => getEpisodes(episodeIds),
    enabled: episodeIds.length > 0,
  });
};
