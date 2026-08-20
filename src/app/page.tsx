"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";

import CharacterCard from "@/components/list/CharcterCard";
import CharacterFilters from "@/components/list/CharacterFilters";
import CharacterSearch from "@/components/list/CharacterSearch";
import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";

import { useCharacters } from "@/hooks/useCharacters";

import type {
  CharacterFilter,
  CharacterGender,
  CharacterStatus,
} from "@/types/character.types";
import { getApiError } from "../../helpers/getApiError";
import CharacterPagination from "@/components/list/CharacterPagination";

export default function CharactersPage() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const filters: CharacterFilter = {
    name: search || undefined,
    type: searchParams.get("type") || undefined,
    species: searchParams.get("species") || undefined,
    status: (searchParams.get("status") as CharacterStatus) || undefined,
    gender: (searchParams.get("gender") as CharacterGender) || undefined,
    page: Number(searchParams.get("page")) || 1,
  };

  const { data, isLoading, error } = useCharacters(filters);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-2">
        <CharacterSearch onSearch={handleSearch} />

        <CharacterFilters />
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorComponent
          title={getApiError(error).title}
          message={getApiError(error).message}
        />
      ) : (
        <>
          <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data?.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {data && (
            <CharacterPagination
              currentPage={filters.page ?? 1}
              totalPages={data.info.pages}
            />
          )}
        </>
      )}{" "}
    </div>
  );
}
