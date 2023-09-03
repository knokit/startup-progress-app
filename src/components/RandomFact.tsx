import { useEffect } from "react";
import { useAsync } from "../hooks";

interface RandomFact {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
}

const RANDOM_FACT_ENDPOINT = "https://uselessfacts.jsph.pl/random.json";

async function fetchRandomFact<TData = RandomFact>(): Promise<TData> {
  const response = await fetch(RANDOM_FACT_ENDPOINT);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TData>;
}

function RandomFact() {
  const { data, status, error, run } = useAsync<RandomFact>();

  useEffect(() => {
    run(fetchRandomFact());
  }, [run]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return (
      <div className="text-error">
        <strong>Failed to load data:</strong>{" "}
        {error?.message || "Unknown error"}
      </div>
    );
  }

  return <p>{data?.text}</p>;
}

export default RandomFact;
