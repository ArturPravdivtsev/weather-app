<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
    <template v-slot:activator="{ props }">
      <v-btn 
        icon 
        v-bind="props"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Enter location</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="city"
          clearable
          hide-details="auto"
          label="City name"
          class="pa-2"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="onCityAdd">
          Add
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRef, ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore/lite';
import { useCitiesStore } from '@/stores/cities';
import { getCityWeather } from '@/lib/api';
import db from '@/firebase/firebase';
import { uid } from 'uid/single';

const citiesStore = useCitiesStore();

let dialog = toRef(false);
let city = toRef('');
const savedCities:[] = toRef([]);

async function onCityAdd() {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }

  const weather = await getCityWeather(city.value);
  const newCityWeather = {
    id: uid(),
    ...weather
  };
  console.log('newCityWeather', newCityWeather);
  citiesStore.addCity(newCityWeather);
  savedCities.value.push(newCityWeather);
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
  dialog.value = false;
}
</script>