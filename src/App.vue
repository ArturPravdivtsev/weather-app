<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <AppHeader :isEdit="isEdit" @editToggle="onEditToggle" />
    <RouterView :cities="citiesStore.cities" :loading="loading" :isEdit="isEdit" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';

import { onMounted } from 'vue';
import { toRef, ref } from 'vue';
import type { City } from '@/lib/types';

import { useCitiesStore } from '@/stores/cities';

let loading = toRef(true);
let isEdit = toRef(false);

const citiesStore = useCitiesStore();

const savedCities = ref([]);

async function getWeather() {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }

  savedCities.value.forEach((city:City) => {
    console.log('city', city)
    citiesStore.addCity({
      ...city
    })
  });

  // citySnapshot.docs.forEach(async (document) => {
  //   const city = document.data();
  //   try {
  //     const data = await getCityWeather(city.city);
  //     const docRef = doc(db, 'cities', document.id);
  //     const id = document.id;
  //     // console.log('docRef', docRef)
  //     // console.log('city', city)
  //     updateDoc(docRef, { currentWeather: data })
  //       .then(() => citiesStore.addCity({
  //         [id]: {
  //           city: city.city,
  //           currentWeather: data
  //         }
  //       }));
  //     // citiesStore.addCity({
  //     //   [id]: {
  //     //       city: city.city,
  //     //       currentWeather: city.currentWeather
  //     //     }
  //     //   })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // });
  // console.log('citiesStore.cities', citiesStore.cities)
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
