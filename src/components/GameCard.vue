<template>
  <div class="card game-card">
    <div class="image-wrapper">
      <img :src="image" :alt="name">
    </div>
    <div class="info-wrapper flex-col">
      {{ name }} ({{ rating }}/5)
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GameCard',
    props: ['name', 'image', 'rating']
  }
</script>
