<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <AppHeader />
    <RouterView :cities="cities" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

import { onMounted } from 'vue';
import axios from 'axios';
import db from './firebase/firebase';
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore/lite';
// import TheWelcome from '../components/TheWelcome.vue'

const API_KEY = 'e8342fbc27f0c7142a735e56dc61c04b';
// const city = 'Moscow';
const cities:object[] = reactive([]);

async function getCityWeather() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);

  citySnapshot.docs.forEach(async (document) => {
    const city = document.data();
    // if (!city.currentWeather) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&units=metric&appid=${API_KEY}`
        );
        const data = response.data;
        const docRef = doc(db, 'cities', document.id);
        updateDoc(docRef, { currentWeather: data })
          .then(() => cities.push(city));
      } catch (err) {
        console.log(err)
      }
    // }
  });
  console.log(cities)
}

onMounted(() => {
  getCityWeather();
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
