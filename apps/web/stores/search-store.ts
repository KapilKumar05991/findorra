import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type SearchState = {
  city: string
  area: string
  postcode: string
  locQuery: string
  query: string
}

export type SearchActions = {
  setSearchLocation: (city: string, area: string, postcode: string) => void
  setLocQuery: (query: string) => void
  setQuery: (query: string) => void
  reset: () => void
}

export type SearchStore = SearchState & SearchActions

export const defaultState: SearchState = {
  city: '',
  area: '',
  postcode: '',
  locQuery: '',
  query: '',
}

export const useSearchStore = create<SearchStore>()((set, get) => ({
  ...defaultState,
  setSearchLocation(city, area, postcode) {
    set({ city, area, postcode })
    console.log(get().city, get().area, get().postcode)
  },
  setLocQuery: (query: string) => {
    set({ locQuery: query })
  },
  setQuery: (query: string) => {
    set({ query })
  },
  reset: () => {
    set(defaultState)
  },
}))