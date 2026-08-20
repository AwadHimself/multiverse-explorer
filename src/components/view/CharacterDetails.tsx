import type { Character } from "@/types/character.types";
import Image from "next/image";

interface CharacterDetailsProps {
  character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div>
        <div className="relative h-[400px] w-full max-w-md overflow-hidden rounded-2xl">
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
          />
        </div>{" "}
      </div>

      <div>
        <h1 className="text-4xl font-bold">{character.name}</h1>

        <div className="mt-6 space-y-3">
          <p>
            <strong>Status:</strong> {character.status}
          </p>

          <p>
            <strong>Species:</strong> {character.species}
          </p>

          <p>
            <strong>Gender:</strong> {character.gender}
          </p>

          <p>
            <strong>Type:</strong> {character.type || "Unknown"}
          </p>

          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>

          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
        </div>
      </div>
    </section>
  );
}
