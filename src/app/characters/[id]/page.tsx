"use client";

import { use } from "react";

import { useCharacter } from "@/hooks/useCharacters";
import CharacterDetails from "@/components/view/CharacterDetails";
import CharacterEpisodes from "@/components/view/CharacterEpisodes";
import ErrorComponent from "@/components/ErrorComponent";
import { getApiError } from "../../../../helpers/getApiError";
import Loader from "@/components/Loader";

interface CharacterDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CharacterDetailsPage({
  params,
}: CharacterDetailsPageProps) {
  const { id } = use(params);

  const characterId = Number(id);

  const { data: character, isLoading, error } = useCharacter(characterId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const apiError = getApiError(error);

    return <ErrorComponent title={apiError.title} message={apiError.message} />;
  }

  if (!character) {
    return (
      <ErrorComponent
        title="Character not found"
        message="Character data is not available."
      />
    );
  }

  const episodeIds = character.episode.map((url) =>
    Number(url.split("/").pop()),
  );

  return (
    <main className="container mx-auto p-6">
      <CharacterDetails character={character} />

      <CharacterEpisodes episodeIds={episodeIds} />
    </main>
  );
}
