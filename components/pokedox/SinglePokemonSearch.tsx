// SinglePokemonSearch.tsx
"use client";

import { useState } from "react";
import { trpc } from "../../utils/   trpc";
import PokemonRow from "./PokemonRow";

const SinglePokemonSearch = () => {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const { data, error, isLoading } = trpc.pokemon.get.useQuery(submittedName!, {
    enabled: !!submittedName,
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pokemon nam here"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setSubmittedName(name)}>Search</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <PokemonRow {...data} />}
    </div>
  );
};

export default SinglePokemonSearch;
