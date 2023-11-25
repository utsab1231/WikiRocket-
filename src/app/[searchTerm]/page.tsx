import getSearchResult from "@/lib/getSearchResult";
import Item from "./components/item";
type Props = { params: { searchTerm: string } };

export async function generateMedata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getSearchResult(searchTerm);
  const data = await wikiData;
  const displayTerm = searchTerm.replaceAll("%20", " ");
  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} not found`,
    };
  }
  return {
    title: `${displayTerm} - Wikipedia`,
    description: "Wikipedia search results for " + displayTerm,
  };
}

export default async function SearchTerm({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getSearchResult(searchTerm);
  const data = await wikiData;
  const result: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {result ? (
        Object.values(result).map((item) => {
          return <Item key={item.pageId} result={item} />;
        })
      ) : (
        <h2 className="p-2 text-2xl">{`${searchTerm} not found`}</h2>
      )}
    </main>
  );

  return content;
}
