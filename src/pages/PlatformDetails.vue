<template>
  <div>
    <div v-if="platformDetails">
    <section class="image-container">
      <div>
        <img :src="platformDetails.image_background" :alt="platformDetails.name">
      </div>
    </section>
    <section class="details">
      <div class="flex-row space"></div>
      <div>
        <h3>{{ platformDetails.name }} ({{ platformDetails.games_count }} games)</h3>
        <p>{{ platformDetails.description }}</p>
      </div>
    </section>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const API_KEY = process.env.VUE_APP_RAWG_KEY

export default {
  name: 'PlatformDetails',
  props: ['games'],
  data: () => ({
    platformDetails: null
  }),
  mounted() {
    this.getPlatformDetails()
  },
  methods: {
    async getPlatformDetails() {
      const platformId = this.$route.params.platform_id
      const details = await axios.get(`https://api.rawg.io/api/platforms/${platformId}?key=${API_KEY}`)
      this.platformDetails = details.data
    }
  }
}
</script>