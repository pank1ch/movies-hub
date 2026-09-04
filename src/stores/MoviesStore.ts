import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { UserMovie } from "../types/user-movie";
import type { Movie } from "../types/movie";
import axios from 'axios';

const apiToken = import.meta.env.VITE_TMDB_TOKEN;

export const useMoviesStore = defineStore('movies-store', () => {

  const _userMovies = ref<UserMovie[]>([]);
  _userMovies.value = JSON.parse(localStorage.getItem('user-movies') || '[]');
  const saveUserData = () => localStorage.setItem('user-movies', JSON.stringify(_userMovies.value));

  watch(_userMovies, saveUserData, { deep: true});


  const _searchResultMovies = ref<Movie[]>([]);

  const userMovies = computed(() => _userMovies.value);
  const searchResultMovies = computed(() => _searchResultMovies.value)

  const isNotFound = ref(false);

  const isMovieAdded = (movieId: number) => {
    return _userMovies.value.some(movie => movie.id === movieId)
  }

  const userWatchedMovies = computed(() => _userMovies.value.filter(movie => movie.is_watched));


  const toggleIsWatched = (movieId: number) => {
    const target = _userMovies.value.find(movie => movie.id === movieId);

    if (target) target.is_watched = !target.is_watched;
  }

  const addMovie = (movieToAdd: Movie) => {
    const newUserMovie: UserMovie = {
      ...movieToAdd,
      is_watched: false
    }

    _userMovies.value.push(newUserMovie);
  }

  const removeMovie = (movieId: number) => {
    _userMovies.value = _userMovies.value.filter((movie) => movie.id !== movieId);
  }

  const searchMovie = async (query: string) => {

    if (query === '') {
      isNotFound.value = false;
      _searchResultMovies.value.length = 0;
      return;
    }

    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          query: query,
        },
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      }
    )
    // console.log(response.data);
    const resultsMovies = response.data.results;

    if (resultsMovies.length) {
      _searchResultMovies.value = resultsMovies;
    }
    else {
      _searchResultMovies.value.length = 0;
      isNotFound.value = true;
    }



  }


  return {
    addMovie,
    removeMovie,
    toggleIsWatched,
    searchMovie,

    isNotFound,
    isMovieAdded,

    userMovies,
    userWatchedMovies,
    searchResultMovies
  }

} )

