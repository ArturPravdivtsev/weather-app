<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <AppHeader @cityAdd="onAddCity" />
    <RouterView :cities="cities" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

import { onMounted } from 'vue';
import db from './firebase/firebase';
import { doc, collection, getDocs, updateDoc, addDoc } from 'firebase/firestore/lite';
import { toRef } from 'vue';

import { getCityWeather } from './lib/api';


const cities:object[] = reactive([]);
let loading = toRef(true);

async function getWeather() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);

  citySnapshot.docs.forEach(async (document) => {
    const city = document.data();
    try {
      const data = await getCityWeather(city.city);
      const docRef = doc(db, 'cities', document.id);
      updateDoc(docRef, { currentWeather: data })
        .then(() => cities.push(city));
    } catch (err) {
      console.log(err)
    }
  });
  console.log(cities)
  loading.value = !loading.value;
}

async function onAddCity(city:string) {
  const data = await getCityWeather(city);
  console.log('data', data)
  const newCity = {
    city: city,
    currentWeather: data
  };
  await addDoc(collection(db, "cities"), newCity);
  cities.push(newCity);
}

onMounted(() => {
  getWeather();
})
</script>

<style scoped>
</style>
