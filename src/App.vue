<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <AppHeader :isEdit="isEdit" @editToggle="onEditToggle" />
    <RouterView :cities="citiesStore.cities" :loading="loading" :isEdit="isEdit" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import type { City } from './lib/lib';

import { onMounted } from 'vue';
import db from './firebase/firebase';
import { doc, collection, getDocs, updateDoc, addDoc, query, where } from 'firebase/firestore/lite';
import { toRef } from 'vue';

import { getCityWeather } from './lib/api';

import { useCitiesStore } from './stores/cities';

let loading = toRef(true);
let isEdit = toRef(false);

const citiesStore = useCitiesStore();

const citiesCol = collection(db, 'cities');

async function getWeather() {
  const citySnapshot = await getDocs(citiesCol);

  citySnapshot.docs.forEach(async (document) => {
    const city = document.data();
    try {
      const data = await getCityWeather(city.city);
      const docRef = doc(db, 'cities', document.id);
      updateDoc(docRef, { currentWeather: data })
        .then(() => citiesStore.addCity({
          city: city.city,
          currentWeather: data 
        }));
    } catch (err) {
      console.log(err)
    }
  });
  console.log(citiesStore.cities)
  loading.value = !loading.value;
}

function onEditToggle(newVal: boolean) {
  isEdit.value = newVal;
}


onMounted(() => {
  getWeather();
})
</script>

<style scoped>
</style>
