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
import { toRef } from 'vue';
import { useCitiesStore } from '@/stores/cities';
import { getCityWeather } from '@/lib/api';
import { uid } from 'uid/single';

const citiesStore = useCitiesStore();

let dialog = toRef(false);
let city = toRef('');

async function onCityAdd() {
  const weather = await getCityWeather(city.value);
  const newCityWeather = {
    id: uid(),
    ...weather
  };
  console.log('newCityWeather', newCityWeather);
  citiesStore.addCity(newCityWeather);
  dialog.value = false;
  city.value = '';
}
</script>