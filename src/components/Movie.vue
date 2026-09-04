<script setup lang="ts">
import { computed } from 'vue';
import type { Movie } from '../types/movie';
import type { UserMovie } from '../types/user-movie';
import { useMoviesStore } from '../stores/MoviesStore';


const props = defineProps<{movie: Movie | UserMovie}>();

const movieDate = computed(() => {
  const date = new Date(props.movie.release_date);

  return date.toLocaleDateString('ru-RU');
})

const moviesStore = useMoviesStore();

</script>


<template>

  <div class="movie">
    <img class="movie__picture" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.original_title">
    <div class="movie__wrapper">
      <h3 class="movie__title">{{ movie.original_title }} ({{ movieDate }})</h3>
      <p v-if="movie.overview">{{ movie.overview }}</p>

      <div class="movie__actions">
        <template v-if="'is_watched' in movie">
          <button v-if="movie.is_watched" class="movie__button movie__button--unwatched" @click="moviesStore.toggleIsWatched(movie.id)">Unwatched</button>
          <button v-else class="movie__button movie__button--watched" @click="moviesStore.toggleIsWatched(movie.id)">Watched</button>
          <button class="movie__button movie__button--delete" @click="moviesStore.removeMovie(movie.id)">Delete</button>
        </template>
        <template v-else>
          <span v-if="moviesStore.isMovieAdded(movie.id)" class="movie__status">Already added</span>
          <button v-else class="movie__button" @click="moviesStore.addMovie(movie)">Add</button>
        </template>
      </div>
    </div>
  </div>


</template>

<style scoped lang="scss">

.movie {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  overflow: hidden;
  min-height: 225px;
  border: 1px solid #eadfe6;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(71, 44, 61, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 26px rgba(71, 44, 61, 0.14);
  }
}

.movie__picture {
  width: 100%;
  height: 100%;
  min-height: 225px;
  object-fit: cover;
  background-color: #eee7eb;
}

.movie__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.movie__title {
  margin: 0 0 12px;
  color: #2f202b;
  font-size: 22px;
  line-height: 1.15;
}

.movie__wrapper p {
  margin: 0;
  color: #6e6069;
  font-size: 15px;
  line-height: 1.5;
}

.movie__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 12px;

}

.movie__button {
  padding: 9px 14px;
  border: 1px solid #ffc823;
  border-radius: 6px;
  background-color: #ffc823;
  min-width: 80px;
  color: #2f202b;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #e2a900;
    background-color: #f2b900;
  }
}

.movie__button--watched {
  border-color: #16a34a;
  background-color: #16a34a;
  color: #ffffff;

  &:hover {
    border-color: #12813b;
    background-color: #12813b;
  }
}

.movie__button--unwatched {
  border-color: #f08c00;
  background-color: #f08c00;
  color: #ffffff;

  &:hover {
    border-color: #c96f00;
    background-color: #c96f00;
  }
}

.movie__button--delete {
  border-color: #dc2626;
  background-color: #dc2626;
  color: #ffffff;

  &:hover {
    border-color: #b91c1c;
    background-color: #b91c1c;
  }


}

.movie__status {
  display: inline-flex;
  align-items: center;
  min-height: 37px;
  box-sizing: border-box;
  padding: 7px 11px;
  border: 1px solid #86efac;
  border-radius: 6px;
  background-color: #dcfce7;
  color: #166534;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;

  &::before {
    content: '\2713';
    margin-right: 6px;
    font-size: 13px;
  }
}

@media (max-width: 540px) {
  .movie {
    grid-template-columns: 105px minmax(0, 1fr);
    min-height: 180px;
  }

  .movie__picture {
    min-height: 180px;
  }

  .movie__wrapper {
    padding: 15px;
  }

  .movie__title {
    font-size: 18px;
  }
}

</style>
