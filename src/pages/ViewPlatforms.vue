<template>
  <div>
    <h1>Platforms</h1>
    <section class="container-grid" >
      <div v-for="platform in platforms" :key="platform.id">
        <PlatformCard :name="platform.name" :image="platform.image_background" @click="selectPlatform(platform.id)"/>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import PlatformCard from '../components/PlatformCard.vue'
  const API_KEY = process.env.VUE_APP_RAWG_KEY

export default {
  name: 'ViewPlatforms',
  components: {
    PlatformCard
  },
  data: () => ({
    platforms: []
  }),
  mounted() {
    this.getPlatforms()
  },
  methods: {
    async getPlatforms() {
      const platforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
      this.platforms = platforms.data.results
    },
    selectPlatform(id) {
      this.$router.push(`/platforms/${id}`)
    }
  }
}
</script>