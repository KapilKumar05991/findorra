import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type SearchState = {
  city: string
  area: string
  query: string
}

export type SearchActions = {
  setCity: (city: string) => void
  setArea: (area: string) => void
  setQuery: (query: string) => void
  reset: () => void
}

export type SearchStore = SearchState & SearchActions

export const defaultState: SearchState = {
  city: 'Agra',
  area: '',
  query: '',
}

export const useSearchStore = create<SearchStore>()(
  devtools(persist((set, get) => ({
    ...defaultState,
    setCity: (city: string) => {
      set({ city })
    },
    setArea(area) {
      set({ area })
    },
    setQuery: (query: string) => {
      set({ query })
    },
    reset: () => {
      set(defaultState)
    },
  }), {
    name: 'search-store',
  })))