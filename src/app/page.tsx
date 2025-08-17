import Image from "next/image";
import  type {Quotes} from '@/types';
import quotesData from "@/data/quotes.json";
export default async function Home() {
  let initialQuote : Quotes | null  = null;
  let fetchError: string | null = null;
  try{
    if(!Array.isArray(quotesData)|| quotesData.length ==0){
      throw new Error("Local quotes data is either invalid or empty");
    }
    const randomIndex  = Math.floor(Math.random()*quotesData.length);
    const randomQuoteData = (quotesData as Quotes[])[randomIndex];
    if(randomQuoteData && randomQuoteData.text && randomQuoteData.author && randomQuoteData.theme ){
      initialQuote = randomQuoteData;
    }
    else{
      throw new Error(`Invalid quote data structure found at index ${randomIndex}`);
    }
  } catch(error){
    console.error(" Error loading initial quote from local file");
    fetchError = error instanceof Error ? error.message: "An unknown error occurred loading local quotes";

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-6">Themed Quote Generator</h1>
      {fetchError ? (
        <p className="text-red-500">Error loading quote: {fetchError}</p>
      ) : initialQuote ? (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-xl text-center">
          <blockquote className="text-xl italic mb-4">"{initialQuote.text}"</blockquote>
          <p className="text-right text-gray-600">- {initialQuote.author}</p>
          <p className="text-sm text-gray-500 mt-2">Theme: {initialQuote.theme}</p>
        </div>
      ) : (
        <p>Loading quote...</p>
      )}
    </main>
  );
}
