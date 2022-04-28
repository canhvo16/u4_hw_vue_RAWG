<template>
  <div v-if="genreDetails && games && topGames && worstGames" class="genres">
    <h2>{{ genreDetails.name }} ({{ genreDetails.games_count }})</h2>
    <p>{{ genreDetails.description }}</p>
    <select v-model="filter" >
      <option value="none"></option>
      <option value="top">Top Rated Games</option>
      <option value="worst">Worst Rated Games</option>
    </select>
    <section v-if="filter === 'none'" class="container-grid">
      <div v-for="game in games" :key="game.id">
      <GameCard :name="game.name" :image="game.background_image" :rating="game.rating" @click="selectGame(game.id)"/>
      </div>
    </section>
    <section v-else-if="filter === 'top'" class="container-grid">
      <div v-for="game in topGames" :key="game.id">
      <GameCard :name="game.name" :image="game.background_image" :rating="game.rating" @click="selectGame(game.id)"/>
      </div>
    </section>
    <section v-else-if="filter === 'worst'" class="container-grid">
      <div v-for="game in worstGames" :key="game.id">
      <GameCard :name="game.name" :image="game.background_image" :rating="game.rating" @click="selectGame(game.id)"/>
      </div>
    </section>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import GameCard from '../components/GameCard.vue'
  const API_KEY = process.env.VUE_APP_RAWG_KEY

  export default {
    name: 'GenreDetails',
    components: {
      GameCard
    },
    data: () => ({
      games: [],
      topGames: [],
      worstGames: [],
      filter: '',
      genreDetails: null
    }),
    mounted() {
      this.getGenreGames()
      this.getTopGenreGames()
      this.getWorstGenreGames()
    },
    methods: {
      async getGenreGames() {
        const genreId = this.$route.params.genre_id
        const games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}`)
        this.games = games.data.results
        const genreDetails = await axios.get(`https://api.rawg.io/api/genres/${genreId}?key=${API_KEY}`)
        this.genreDetails = genreDetails.data
        this.filter = 'none'
      },
      selectGame(gameId) {
        this.$router.push(`/details/${gameId}`)
      },
      async getTopGenreGames() {
        const genreId = this.$route.params.genre_id
        const games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}&ordering=-rating`)
        this.topGames = games.data.results
      },
      async getWorstGenreGames() {
        const genreId = this.$route.params.genre_id
        const games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}&ordering=rating`)
        this.worstGames = games.data.results
      }
    }
  }
</script>