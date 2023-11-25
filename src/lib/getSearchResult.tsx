export default async function getSearchResult(searchterm: string) {
  const searchParams = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: searchterm,
    gsrlimit: "20",
    format: "json",
    prop: "extracts|pageimages",
    exchars: "100",
    exintro: "true",
    exlimit: "max",
    explaintext: "true",
    origin: "*",
  });

  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?${searchParams}`
  );
  return response.json();
}
