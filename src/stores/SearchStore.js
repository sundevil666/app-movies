import {defineStore} from 'pinia';
import {useMovieStore} from './MovieStore.js';
import {ref} from 'vue';

const url = "https://api.themoviedb.org/3/search/movie?api_key=64560c1131daa0a7b5a7f4c81b50ed91&query="

export const useSearchStore = defineStore('searchStore', () => {

  const loader = ref(false)
  const movies = ref([])

  const getMovies = async (search) => {
    loader.value = true
    const res = await fetch(`${url}${search}`)
    const data = await res.json()
    movies.value = data.results
    loader.value = false
  }

  const addToUserMovies = (obj) => {
      const moviesStore = useMovieStore()
      moviesStore.movies.push({...obj, isWatched: false})
      moviesStore.activeTab = 1
  }

  return {
    loader, movies, getMovies, addToUserMovies
  }
})
