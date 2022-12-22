import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref([])
  const activeTab = ref(2)

  const moviesOnLocalStorage = localStorage.getItem('movies')

  if(moviesOnLocalStorage) {
    movies.value = JSON.parse(moviesOnLocalStorage)._value
  }

  const watchedMovies = computed(() => {
    return movies.value.filter(el => el.isWatched)
  })

  const totalCountMovies = computed(() => {
    return movies.value.length
  })

  const setActiveTab = (id) => {
    activeTab.value = id
  }
  const toggleWatched = (id) => {
    const idx = movies.value.findIndex(el => el.id === id)
    movies.value[idx].isWatched = !movies.value[idx].isWatched
  }
  const deleteMovie = (id) => {
    movies.value = movies.value.filter(el => el.id !== id)
  }

  watch(() => movies, state => {
    localStorage.setItem('movies', JSON.stringify(state))
  }, {deep: true})

  return {
    movies, activeTab, watchedMovies, toggleWatched, totalCountMovies, setActiveTab, deleteMovie
  }
})