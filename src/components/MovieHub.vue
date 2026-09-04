<script setup lang="ts">
import { ref } from 'vue';
import { useMoviesStore } from '../stores/MoviesStore';
import Movie from './Movie.vue';
import { debounce } from '../utils/debounce';

const moviesStore = useMoviesStore();

const currentTab = ref<'home' | 'search'>('home');

const searchForMovie = debounce(moviesStore.searchMovie, 400)

const onUserInput = (event: Event) => {

  const input = event.target as HTMLInputElement;

  searchForMovie(input.value.trim());
}

</script>

<template>

  <div class="tabs">
    <button :class="{ 'active': currentTab === 'home'}" @click="currentTab = 'home'">Favorite</button>
    <button :class="{ 'active': currentTab === 'search'}" @click="currentTab = 'search'">Search</button>
  </div>

  <template v-if="currentTab === 'home'">
    <div v-if="moviesStore.userWatchedMovies.length" class="tabs-section">
      <h2 class="tabs-title">Watched Movies (count: {{ moviesStore.userWatchedMovies.length }})</h2>
      <ul class="tabs-list">
        <Movie v-for="movie in moviesStore.userWatchedMovies" :movie="movie" :key="movie.id" />
      </ul>
    </div>

    <div v-if="moviesStore.userMovies.length" class="tabs-section">
      <h2 class="tabs-title">All Movies (count: {{ moviesStore.userMovies.length }})</h2>
      <ul class="tabs-list">
        <Movie v-for="movie in moviesStore.userMovies" :movie="movie" :key="movie.id" />
      </ul>
    </div>
  </template>
  <template v-else>
    <input type="text" class="movies-search" @input="onUserInput">
    <ul v-if="moviesStore.searchResultMovies.length" class="tabs-list">
      <Movie v-for="movie in moviesStore.searchResultMovies" :movie="movie" :key="movie.id" />
    </ul>
    <p v-else-if="moviesStore.isNotFound" class="info-alert">Nothing found..</p>
  </template>

</template>


<style lang="scss" scoped>

.tabs {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}

.tabs button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;

  background-color: #CFCFCF;
  color: #000000;
  cursor: pointer;
  min-width: 150px;
  font-weight: 500;
  font-size: 20px;
  font-family: inherit;
  transition: all 0.2s ease-in-out;
  &.active {
    background-color: #ffc823;

  }
  &:hover {
    background-color: #ffc823;

  }

}

.movies-search {
  box-sizing: border-box;
  width: 60%;
  margin: 0 auto 25px;
  display: block;
  padding: 10px 35px 10px 10px;
  border-radius: 6px;
  border: 1px solid #CFCFCF;
  outline: none;
  transition: all 0.2s ease;

  font-size: 18px;
  font-family: inherit;

  background-image: url('/icons/search.svg');
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center right 10px;

  &:focus {
    border-color: #ffc823;
    box-shadow: 0 0 0 4px rgba(255, 200, 35, 0.25);
  }
}

.tabs-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.info-alert {
  box-sizing: border-box;
  width: 60%;
  margin: 30px auto 0;
  padding: 18px 20px;
  border: 1px solid #f0c84b;
  border-radius: 8px;
  background-color: #fff8dc;
  color: #735b16;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}

@media (max-width: 540px) {
  .info-alert {
    width: 100%;
  }
}


.tabs-section {
  margin-bottom: 30px;

  &:last-of-type {
    margin: 0;
  }
}

.tabs-title {
  margin: 0 0 15px 0;
}
</style>
