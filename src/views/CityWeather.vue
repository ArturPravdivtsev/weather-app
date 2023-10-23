<template>
  <v-card
    class="pa-2 ma-2"
  >
    <v-card-item class="pt-6" :title="currentWeather.location.name">
    </v-card-item>
    <v-card-text class="pt-12 weather-icon-wrapper">
      <!-- <span class="bg night"></span> -->
      <div class="weather-icon">
        <img src="/moon.png" />
      </div>
      <v-row align="center" no-gutters>
        <v-col
          class="text-h1"
          cols="6"
        >
          {{ temperature }}&deg;
        </v-col>
      </v-row>
      <v-row align="center" no-gutters>
        <v-col
          cols="3"
        >
          <v-list class="bg-transparent d-inline-flex">
            <p class="text-subtitle-1 ma-2">{{ tempMax }} <v-icon>mdi-thermometer-chevron-up</v-icon></p>
            <p class="text-subtitle-1 ma-2">{{ tempMin }} <v-icon>mdi-thermometer-chevron-down</v-icon></p>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5">{{ capitalizeFirstLetter(currentWeather.current.condition.text) }}</p>
          <p class="text-subtitle-1">Feels like {{ feelsLike }}&deg;</p>
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
import { toRef, computed } from 'vue';
import type { City } from '@/lib/types';
import { useCitiesStore } from '@/stores/cities';
import { useSettingsStore } from '@/stores/settings';
import { round, capitalizeFirstLetter } from '@/lib/lib';
import HourlyWeather from '@/components/HourlyWeather.vue';
import WeaklyWeather from '@/components/WeaklyWeather.vue';

const route = useRoute();
const citiesStore = useCitiesStore();
const settingsStore = useSettingsStore();

const currentWeather = computed(() => citiesStore.getCityByName(route.params.city.toString()));
console.log('currentWeather', currentWeather.value)
const hourlyForecast = toRef(currentWeather.value.forecast.forecastday[0].hour);
const weeklyForecast = toRef(currentWeather.value.forecast.forecastday);

const temperature = computed(() => round(currentWeather.value.current[`temp_${settingsStore.temperatureUnit}`]) );
const feelsLike = computed(() => round(currentWeather.value.current[`feelslike_${settingsStore.temperatureUnit}`]) );
const tempMax = computed(() => round(currentWeather.value.forecast.forecastday[0].day[`maxtemp_${settingsStore.temperatureUnit}`]) );
const tempMin = computed(() => round(currentWeather.value.forecast.forecastday[0].day[`mintemp_${settingsStore.temperatureUnit}`]) );

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

.weather-icon-wrapper {
  position: relative;
}

.weather-icon {
  height: 100%;
  position: absolute;
  top: -5%;
  right: -175px;
  display: flex;
  align-items: center;
}
.weather-icon img {
  width: 366px;
  height: 366px;
}
</style>