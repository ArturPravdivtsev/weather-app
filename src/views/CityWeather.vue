<template>
  <v-card
    class="pa-2 ma-2"
  >
    <v-card-item :title="currentWeather.name">
    </v-card-item>
    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h2"
          cols="6"
        >
        {{ round(currentWeather.main.temp) }}&deg;
        </v-col>
      </v-row>
      <v-row align="center" no-gutters>
        <v-col
          class="text-h2"
          cols="3"
        >
          <v-list class="bg-transparent d-inline-flex">
            <v-list-item
              :title="round(currentWeather.main.temp_max)"
              append-icon="mdi-thermometer-chevron-up"
            >
            </v-list-item>
            <v-list-item
              :title="round(currentWeather.main.temp_min)"
              append-icon="mdi-thermometer-chevron-down"
            >
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import db from '@/firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { toRef } from 'vue';
import type { CurrentWeather } from '@/lib/lib';
import { currentWeatherItem } from '@/lib/lib';
import { getCityWeatherOneCall } from '@/lib/api';

const route = useRoute();
let currentWeather = toRef<CurrentWeather>(currentWeatherItem);
let forecast = toRef(null);
const round = (num:number) => { return Math.round(num); }

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