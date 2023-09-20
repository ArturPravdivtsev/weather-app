<template>
  <v-card
    max-width="368"
    class="pa-2 ma-2"
  >
    <v-card-item :title="city.city">
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
      <v-spacer></v-spacer>
      <v-btn
        v-if="isEdit"
        icon
        density="compact"
        variant="plain"
        @click="onDeleteClick"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import db from '../firebase/firebase';
import { doc, collection, getDocs, updateDoc, addDoc, query, where } from 'firebase/firestore/lite';
import type { City } from '../lib/lib';
import { useCitiesStore } from '../stores/cities';

const props = defineProps<{
  city: City,
  isEdit: boolean
}>();

const citiesStore = useCitiesStore();

const citiesCol = collection(db, 'cities');

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

const onDeleteClick = () => {
  citiesStore.removeCity(props.city.city);
  const q = query(citiesCol, where("city", "==", props.city.city));
  console.log('q', q)
  console.log(doc(db, "cities", props.city.city))
}

</script>