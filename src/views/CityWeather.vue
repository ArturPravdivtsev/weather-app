<template>
  <v-card
    class='pa-2 ma-2'
  >
    <v-card-item class='pt-6' :title='currentWeather.location.name'>
    </v-card-item>
    <v-card-text class='pt-12 weather-icon-wrapper'>
      <!-- <span class='bg night'></span> -->
      <div class='weather-icon'>
        <img src='/moon.png' />
      </div>
      <v-row align='center' no-gutters>
        <v-col
          class='text-h1'
          cols='6'
        >
          {{ round(temperature) }}&deg;
        </v-col>
      </v-row>
      <v-row align='center' no-gutters>
        <v-col
          cols='3'
        >
          <v-list class='bg-transparent d-inline-flex'>
            <p class='text-subtitle-1 ma-2'>{{ round(tempMax) }} <v-icon>mdi-thermometer-chevron-up</v-icon></p>
            <p class='text-subtitle-1 ma-2'>{{ round(tempMin) }} <v-icon>mdi-thermometer-chevron-down</v-icon></p>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class='text-h5'>{{ capitalizeFirstLetter(current.condition.text) }}</p>
          <p class='text-subtitle-1'>Feels like {{ round(feelsLike) }}&deg;</p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider color='info' class='mt-12'></v-divider>
    <v-card-text>
      <HourlyWeather :forecast='hourlyForecast' />
      <WeaklyWeather :forecast='weeklyForecast' />
    </v-card-text>
    <v-divider color='info' class='mt-12'></v-divider>
    <v-card-text class='pa-2 ma-2'>
      <v-row>
        <v-col>
          <p class='text-subtitle-1'>Sunrise</p>
          <p class='text-h6'>{{ sunrise }}</p>
        </v-col>
        <v-col>
          <p class='text-subtitle-1'>Sunset</p>
          <p class='text-h6'>{{ sunset }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class='text-subtitle-1'>Humidity</p>
          <p class='text-h6'>{{ humudity }}</p>
        </v-col>
        <v-col>
          <p class='text-subtitle-1'>Cloudness</p>
          <p class='text-h6'>{{ cloud }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class='text-subtitle-1'>Wind</p>
          <p class='text-h6'>{{ wind }}</p>
        </v-col>
        <v-col>
          <p class='text-subtitle-1'>Pressure</p>
          <p class='text-h6'>{{ pressure }}</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { toRef, computed } from 'vue';
import { useCitiesStore } from '@/stores/cities';
import { useSettingsStore } from '@/stores/settings';
import { round, capitalizeFirstLetter, isCelcsius } from '@/lib/lib';
import HourlyWeather from '@/components/HourlyWeather.vue';
import WeaklyWeather from '@/components/WeaklyWeather.vue';

const route = useRoute();
const citiesStore = useCitiesStore();
const settingsStore = useSettingsStore();

const currentWeather = computed(() => citiesStore.getCityByName(route.params.city.toString()));
const hourlyForecast = toRef(currentWeather.value.forecast.forecastday[0].hour);
const weeklyForecast = toRef(currentWeather.value.forecast.forecastday);

console.log('currentWeather.value', currentWeather.value)

const current = currentWeather.value.current;
const dayForecast = currentWeather.value.forecast.forecastday[0].day;
const astro = currentWeather.value.forecast.forecastday[0].astro;

const temperature = computed(() => {
  if (isCelcsius(settingsStore.temperatureUnit)) return current.temp_c;
  return current.temp_f;
});
const feelsLike = computed(() => {
  if (isCelcsius(settingsStore.temperatureUnit)) return current.feelslike_c;
  return current.feelslike_f;
});
const tempMax = computed(() => {
  if (isCelcsius(settingsStore.temperatureUnit)) return dayForecast.maxtemp_c;
  return dayForecast.maxtemp_f;
});
const tempMin = computed(() => {
  if (isCelcsius(settingsStore.temperatureUnit)) return dayForecast.mintemp_c;
  return dayForecast.mintemp_f;
});

const humudity = current.humidity;
const pressure = current.pressure_mb;
const wind = current.wind_kph;
const cloud = current.cloud;
const sunset = astro.sunset;
const sunrise = astro.sunrise;

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