<template>
  <div class='flex flex-col min-h-screen font-Roboto bg-weather-primary'>
    <AppHeader :isEdit='isEdit' @editToggle='onEditToggle' />
    <RouterView :cities='citiesStore.cities' :loading='loading' :isEdit='isEdit' />
  </div>
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { toRef, ref } from 'vue';
import type { City } from '@/lib/types';
import { useCitiesStore } from '@/stores/cities';
import { getCityWeather } from '@/lib/api';
import AppHeader from '@/components/AppHeader.vue';

const citiesStore = useCitiesStore();

let loading = toRef(true);
let isEdit = toRef(false);

const savedCities = ref([]);

function getWeather() {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }

  savedCities.value.forEach(async (city:City) => {
    // console.log('city', city)
    const weather = await getCityWeather(city.location.name);
    // console.log('citiesStore', citiesStore.cities)
    // console.log('weather', weather)
    citiesStore.updateCity(city.id, weather);
    // citiesStore.addCity({
    //   id: city.id,
    //   ...weather
    // });
    // console.log('citiesStore', citiesStore.cities)
  });

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
