import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '@/views/CitiesList.vue';
import CityWeather from '@/views/CityWeather.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cities',
      component: CitiesList
    },
    {
      path: '/weather/:city',
      name: 'city weather',
      component: CityWeather
    }
  ]
});

export default router;
