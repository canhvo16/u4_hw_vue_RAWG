<template>
<a :href="url">
  <div class="card">
    <div class="image-wrapper">
      {{ name }}
    </div>
    <hr/>
    <div class="info-wrapper flex-col">
      {{ text }}
    </div>
  </div>
</a>
</template>

<script>
  export default {
    name: 'RedditCard',
    props: ['name', 'text', 'url']
  }
</script>