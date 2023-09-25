import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue';
import CityWeather from '../views/CityWeather.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cities',
      component: CitiesList
    },
    {
      path: '/weather/:id',
      name: 'city weather',
      component: CityWeather
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
