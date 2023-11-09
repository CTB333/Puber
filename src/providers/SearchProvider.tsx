import { createContext, useContext, useState } from "react";
import { PartyTag } from "../interfaces";

type SearchContextStateType = {
  search: string;
  filters: PartyTag[];
  searchRadius: number;
};

type SearchContextType = SearchContextStateType & {
  setSearch: (search: string) => void;
  setFilters: (filters: PartyTag[]) => void;
  setSearchRadius: (radius: number) => void;
};

const initialState = {
  search: "",
  filters: [],
  searchRadius: 30,
};

const initialValue = {
  ...initialState,
  setSearch: (s: string) => {},
  setFilters: (f: PartyTag[]) => {},
  setSearchRadius: (n: number) => {},
};

const SearchContext = createContext<SearchContextType>(initialValue);

export const useSearch = () => useContext(SearchContext);

type SearchProviderProps = {
  children: React.ReactNode;
};

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<PartyTag[]>([]);
  const [searchRadius, setSearchRadius] = useState<number>(30);

  const value = {
    search,
    filters,
    searchRadius,
    setSearch,
    setFilters,
    setSearchRadius,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
