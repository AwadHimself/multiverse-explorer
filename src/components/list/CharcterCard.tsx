import { cn } from "@/lib/utils";
import type { Character } from "@/types/character.types";
import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
  character: Character;
}

const statusStyles = {
  Alive: "bg-primary text-primary-foreground",
  Dead: "bg-danger text-foreground",
  unknown: "bg-secondary text-secondary-foreground",
};

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.id}`} className="group block">
      <div className="flex flex-col items-center gap-2 overflow-hidden rounded-2xl bg-card pb-4 h-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="rounded-t-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        <h2 className="text-xl text-center font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          {character.name}
        </h2>
        <p
          className={cn(
            "rounded-full px-3 py-1 text-sm font-semibold",
            statusStyles[character.status],
          )}
        >
          {character.status}
        </p>
        <p className="text-foreground">{character.species}</p>
        <p className="text-foreground">{character.gender}</p>
      </div>
    </Link>
  );
}
