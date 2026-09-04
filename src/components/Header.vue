<script lang="ts" setup>

const props = withDefaults(defineProps<{title?: string}>(), {
    title: 'some header',
});

</script>

<template>

  <header>
    <div class="container">
      <img  src="/main-logo.svg" alt="">
      <h1>{{ props.title }}</h1>
    </div>
  </header>


</template>

<style scoped lang="scss">

header {
  padding-top: 30px;
  padding-bottom: 30px;
}

header > .container {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

header img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

header h1 {
  margin: 0;
  transform: translateY(3px);
}
</style>
