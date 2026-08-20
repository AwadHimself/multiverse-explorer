import { Suspense } from "react";

import Loader from "@/components/Loader";
import CharactersPage from "@/components/list/CharactersPage";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CharactersPage />
    </Suspense>
  );
}
