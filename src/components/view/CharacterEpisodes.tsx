"use client";

import { useEpisodes } from "@/hooks/useEpisodes";

interface CharacterEpisodesProps {
  episodeIds: number[];
}

export default function CharacterEpisodes({
  episodeIds,
}: CharacterEpisodesProps) {
  const { data: episodes, isLoading, error } = useEpisodes(episodeIds);

  if (isLoading) {
    return (
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Episodes</h2>

        <p>Loading episodes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Episodes</h2>

        <p>Failed to load episodes.</p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">
        Episodes ({episodes?.length ?? 0})
      </h2>

      {!episodes?.length && <p>No episodes found.</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {episodes?.map((episode) => (
          <article
            key={episode.id}
            className=" bg-accent rounded-xl border p-5"
          >
            <h3 className="text-lg font-semibold">{episode.name}</h3>

            <p className="mt-2 text-sm  text-muted-foreground">
              {episode.episode}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {episode.air_date}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
