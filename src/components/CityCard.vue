<template>
  <v-card
    max-width="368"
    class="pa-2 ma-2"
  >
    <v-card-item :title="city.city">
      <!-- <template v-slot:subtitle>
        <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="me-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </template> -->
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h2"
          cols="6"
        >
          {{ temperature }}&deg;C
        </v-col>

        <v-col cols="6" class="text-right">
          <!-- <v-icon
            color="error"
            icon="mdi-weather-hurricane"
            size="88"
          ></v-icon> -->
          <v-img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" :title="description" />
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-windy"
      >
        <v-list-item-subtitle>{{ windSpeed }} km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-pouring"
      >
        <v-list-item-subtitle>{{ humidity }}%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <v-list class="bg-transparent">
          <v-list-item
            :title="tempMax"
            subtitle="Temperature max"
            append-icon="mdi-thermometer-chevron-up"
          >
          </v-list-item>
          <v-list-item
            :title="tempMin"
            subtitle="Temperature min"
            append-icon="mdi-thermometer-chevron-down"
          >
          </v-list-item>
          <v-list-item
            :title="feelsLike"
            subtitle="Temperature feels like"
            append-icon="mdi-thermometer-check"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="onExpandClick">
        {{ !expand ? 'Full Report' : 'Hide Report' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { toRef } from 'vue';

interface Weather {
  description: string,
  icon: string,
  main: string
}
interface City {
  city: string,
  currentWeather: {
    weather: [Weather],
    main: {
      feels_like: number,
      humidity: number,
      pressure: number,
      temp: number,
      temp_max: number,
      temp_min: number
    },
    wind: {
      deg: number,
      speed: number
    }
  }
}
const props = defineProps<{
  city: City
}>();

console.log("city.value", props.city)
let expand = toRef(false);
const round = (num:number) => { return Math.round(num); }
const capitalizeFirstLetter = (str:string) => { return str.charAt(0).toUpperCase() + str.slice(1); }
const temperature:number = round(props.city.currentWeather.main.temp);
const icon:string = props.city.currentWeather.weather[0].icon;
const description:string = capitalizeFirstLetter(props.city.currentWeather.weather[0].description);
const windSpeed:string = (props.city.currentWeather.wind.speed * 3.6).toFixed(1);
const humidity:number = props.city.currentWeather.main.humidity;
const detailed = props.city.currentWeather.main;
const tempMax:string = `${round(detailed.temp_max)}\xB0C`;
const tempMin:string = `${round(detailed.temp_min)}\xB0C`;
const feelsLike:string = `${round(detailed.feels_like)}\xB0C`;

const onExpandClick = () => {
  expand.value = !expand.value;
}
</script>