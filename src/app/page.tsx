"use client";

import CharacterCard from "@/components/CharcterCard";
import { useCharacters } from "@/hooks/useCharacters";

export default function CharactersPage() {
  const { data, isLoading, error } = useCharacters({
    page: 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 my-10 ">
      {data?.results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
