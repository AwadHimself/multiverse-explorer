"use client";

import { useEffect, useState } from "react";

interface CharacterSearchProps {
  onSearch: (value: string) => void;
  initialValue?: string;
  debounceMs?: number;
}

export default function CharacterSearch({
  onSearch,
  initialValue = "",
  debounceMs = 500,
}: CharacterSearchProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, debounceMs, onSearch]);

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Search characters..."
      className="w-full rounded-lg border px-4 py-3"
    />
  );
}
