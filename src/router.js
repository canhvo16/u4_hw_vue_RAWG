import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import GameDetails from './pages/GameDetails'
import ViewGames from './pages/ViewGames'
import AboutPage from './pages/AboutPage'
import GenreDetails from './pages/GenreDetails'
import ViewPlatforms from './pages/ViewPlatforms'
import PlatformDetails from './pages/PlatformDetails'

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/games', component: ViewGames, name: 'ViewGames' },
  { path: '/details/:game_id', component: GameDetails, name: 'GameDetails' },
  { path: '/about', component: AboutPage, name: 'AboutPage' },
  { path: '/genre/:genre_id', component: GenreDetails, name: 'GenreDetails' },
  { path: '/platforms', component: ViewPlatforms, name: 'ViewPlatforms' },
  {
    path: '/platforms/:platform_id',
    component: PlatformDetails,
    name: 'PlatformDetails'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
