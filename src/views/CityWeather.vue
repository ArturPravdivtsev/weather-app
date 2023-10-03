<template>
  <v-card
    class="pa-2 ma-2"
  >
    <v-card-item class="pt-6" :title="currentWeather.name">
    </v-card-item>
    <v-card-text class="pt-12">
      <!-- <span class="bg night"></span> -->
      <div class="weather-icon">
        <img src="/moon.png" />
      </div>
      <v-row align="center" no-gutters>
        <v-col
          class="text-h1"
          cols="6"
        >
        {{ round(currentWeather.main.temp) }}&deg;
        </v-col>
      </v-row>
      <v-row align="center" no-gutters>
        <v-col
          cols="3"
        >
          <v-list class="bg-transparent d-inline-flex">
            <p class="text-subtitle-1 ma-2">{{ round(currentWeather.main.temp_max) }} <v-icon>mdi-thermometer-chevron-up</v-icon></p>
            <p class="text-subtitle-1 ma-2">{{ round(currentWeather.main.temp_min) }} <v-icon>mdi-thermometer-chevron-down</v-icon></p>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5">{{ capitalizeFirstLetter(currentWeather.weather[0].description) }}</p>
          <p class="text-subtitle-1">Feels like {{ round(currentWeather.main.temp_max) }}&deg;</p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider color="info" class="mt-12"></v-divider>
    <v-card-text>
      <HourlyWeather :forecast="hourlyForecast" />
      <WeaklyWeather :forecast="weeklyForecast" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import db from '@/firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { onBeforeMount, toRef } from 'vue';
import type { CurrentWeather } from '@/lib/types';
import { currentWeatherItem } from '@/lib/types';
import { getCityWeatherHourly, getCityWeatherWeekly } from '@/lib/api';
import { round, capitalizeFirstLetter } from '@/lib/lib';
import HourlyWeather from '@/components/HourlyWeather.vue';
import WeaklyWeather from '@/components/WeaklyWeather.vue';

const route = useRoute();
let currentWeather = toRef<CurrentWeather>(currentWeatherItem);
let hourlyForecast = toRef([]);
let weeklyForecast = toRef([]);

const q = query(collection(db, "cities"), where("city", "==", route.params.city));

onBeforeMount(() => {
  getDocs(q)
  .then((docs) => {
    docs.forEach(async (doc) => {
      currentWeather.value = doc.data().currentWeather;
      hourlyForecast.value = (await getCityWeatherHourly(currentWeather.value.coord.lat, currentWeather.value.coord.lon)).list;
      console.log('hourlyForecast.value', hourlyForecast.value)
      weeklyForecast.value = (await getCityWeatherWeekly(currentWeather.value.coord.lat, currentWeather.value.coord.lon)).list;
      console.log('weeklyForecast.value', weeklyForecast.value)
    })
});
})

// const filteredList = () => forecast.value ? forecast.hourly.slice(0, 23) : [];

</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  z-index: -1;
}
.day {
  background: url('../../public/sun.png') no-repeat center center;
}
.night {
  background: url('../../public/moon.png') no-repeat center center;
}

.weather-icon {
  height: 100%;
  position: absolute;
  top: 0;
  right: -180px;
  display: flex;
  align-items: center;
}
.weather-icon img {
  width: 366px;
  height: 366px;
}
</style>