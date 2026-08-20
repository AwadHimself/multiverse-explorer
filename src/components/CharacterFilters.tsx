"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type {
  CharacterFilter,
  CharacterGender,
  CharacterStatus,
} from "@/types/character.types";

export default function CharacterFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [type, setType] = useState(() => searchParams.get("type") ?? "");
  const [species, setSpecies] = useState(
    () => searchParams.get("species") ?? "",
  );
  const [status, setStatus] = useState<CharacterStatus | "">(
    () => (searchParams.get("status") as CharacterStatus) ?? "",
  );
  const [gender, setGender] = useState<CharacterGender | "">(
    () => (searchParams.get("gender") as CharacterGender) ?? "",
  );

  function updateParams(filters: CharacterFilter) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleApply() {
    updateParams({
      type: type || undefined,
      species: species || undefined,
      status: status || undefined,
      gender: gender || undefined,
      page: 1,
    });
  }

  function handleReset() {
    setType("");
    setSpecies("");
    setStatus("");
    setGender("");

    router.push(pathname);
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <input
          type="text"
          value={type}
          onChange={(event) => setType(event.target.value)}
          placeholder="Type"
          className="rounded-lg border px-4 py-2"
        />

        <input
          type="text"
          value={species}
          onChange={(event) => setSpecies(event.target.value)}
          placeholder="Species"
          className="rounded-lg border px-4 py-2"
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as CharacterStatus | "")
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">All statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={gender}
          onChange={(event) =>
            setGender(event.target.value as CharacterGender | "")
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">All genders</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleApply}
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border px-5 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
