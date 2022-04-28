<template>
  <div>
    <div class="search">
      <form @submit="getSearchResults" >
        <input 
          type="text"
          :value="searchQuery"
          @keypress="handleChange"
        >
        <button>Search</button>
      </form>
      <h2>Search Results</h2>
      <section class="search-results container-grid" >
        <div v-for="result in searchResults" :key="result.id">
        <GameCard :name="result.name" :image="result.background_image" :rating="result.rating" @click="selectGame(result.id)"/>
        </div>
      </section>
    </div>

    <div class="genres" v-if="!searched" >
      <h2>Genres</h2>
      <section class="container-grid" >
        <div v-for="genre in genres" :key="genre.id">
        <GenreCard :name="genre.name" :image="genre.image_background" @click="selectGenre(genre.id)"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import GenreCard from '../components/GenreCard.vue'
  import GameCard from '../components/GameCard.vue'
  const API_KEY = process.env.VUE_APP_RAWG_KEY

  export default {
    name: 'HomePage',
    components: {
      GenreCard,
      GameCard
    },
    data: () => ({
      genres: [],
      searchQuery: '',
      searchResults: [],
      searched: false
    }),
    mounted() {
      this.getGenres()
    },
    methods: {
      async getGenres() {
        const genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        this.genres = genres.data.results
      },
      async getSearchResults(e) {
        e.preventDefault()
        const search = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${this.searchQuery}`)
        this.searchResults = search.data.results
        this.searched = true
      },
      handleChange(event) {
        this.searchQuery = event.target.value
      },
      selectGame(gameId) {
        this.$router.push(`/details/${gameId}`)
      },
      selectGenre(genreId) {
        this.$router.push(`/genre/${genreId}`)
      }
    }
  }
</script>
