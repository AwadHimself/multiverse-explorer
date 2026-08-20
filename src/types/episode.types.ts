export type EpisodeCharacter = string;

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: EpisodeCharacter[];
  url: string;
  created: string;
}

export type EpisodesResponse = Episode | Episode[];
