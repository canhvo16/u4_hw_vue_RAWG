<template>
  <div class="card">
    <div class="image-wrapper">
      <img :src="image" :alt="name">
    </div>
    <div class="info-wrapper flex-col">
      {{ name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GenreCard',
    props: ['name', 'image']
  }
</script>
