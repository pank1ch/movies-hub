<script setup lang="ts">

import Header from './components/Header.vue';
import MovieHub from './components/MovieHub.vue';
</script>

<template>
  <Header title="My favorite movies"/>

  <main>
    <div class="container">
      <MovieHub />
    </div>
  </main>


</template>

<style>

.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
}

</style>
