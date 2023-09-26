<template>
  <p>{{currentWeather?.main.feels_like}}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import db from '../firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { toRef } from 'vue';
import type { CurrentWeather } from '@/lib/lib';
import { getCityWeatherOneCall } from '@/lib/api';

const route = useRoute();
let currentWeather = toRef<CurrentWeather|null>(null);
let forecast = toRef(null);

const q = query(collection(db, "cities"), where("city", "==", route.params.city));

getDocs(q)
  .then((docs) => {
    docs.forEach(async (doc) => {
      currentWeather.value = doc.data().currentWeather;
      forecast.value = await getCityWeatherOneCall(currentWeather.value.coord.lat, currentWeather.value.coord.lon);
    })
  });

console.log('currentWeather', currentWeather.value)
console.log('forecast', forecast.value)

</script>