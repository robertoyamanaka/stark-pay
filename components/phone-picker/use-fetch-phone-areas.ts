import { useQuery } from "@tanstack/react-query";


export type Area = {
    code: string;
    name: string;
    callingCode: string;
    flag: string;
  };


// Function to fetch country data
async function fetchPhoneAreas() {
  const response = await fetch("https://restcountries.com/v2/all");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.map((item:any) => ({
    code: item.alpha2Code,
    name: item.name,
    callingCode: `+${item.callingCodes[0]}`,
    flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`,
  }));
}

// Custom hook using useQuery in v5
export function useFetchPhoneAreas() {
    return useQuery<Area[], Error>({
        queryKey: ['countries'],
        queryFn: fetchPhoneAreas,
        staleTime: 1000 * 60 * 60 * 24 * 30 // 30 days in milliseconds
      });
}
