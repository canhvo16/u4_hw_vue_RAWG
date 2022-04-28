<template>
  <div class="game-content" v-if="gameDetails" >
    <section class="image-container">
      <div>
        <img :src="gameDetails.background_image" :alt="gameDetails.name">
      </div>
    </section>
    <section class="details">
      <div class="flex-row space"></div>
      <div>
        <h3>{{ gameDetails.name }} ({{ gameDetails.released }})</h3>
        <p>{{ gameDetails.description_raw }}</p>
      </div>
    </section>
    <button @click="goHome">Back to Home</button>
    <h3>Recent Reddit Posts</h3>
    <section class="container-grid">
      <div v-for="post in reddit" :key="post.id">
        <RedditCard :name="post.name" :text="post.text" :url="post.url" />
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import RedditCard from '../components/RedditCard.vue'
  const API_KEY = process.env.VUE_APP_RAWG_KEY

  export default {
    name: 'GameDetails',
    components: {
      RedditCard
    },
    data: () => ({
      gameDetails: null,
      reddit: null
    }),
    mounted() {
      this.getGameDetails()
    },
    methods: {
      async getGameDetails() {
        const gameId = this.$route.params.game_id
        const details = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
        this.gameDetails = details.data
        const reddit = await axios.get(`https://api.rawg.io/api/games/${gameId}/reddit?key=${API_KEY}`)
        this.reddit = reddit.data.results
      },
      goHome() {
        this.$router.push('/')
      }
    }
  }
</script>
