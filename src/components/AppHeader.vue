<template>
  <v-toolbar
    density="comfortable"
    :elevation="8"
  >
    <!-- <v-btn icon>
      <v-icon>mdi-menu</v-icon>
    </v-btn> -->

    <v-toolbar-title>Weather App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      icon
      @click="onEditToggle"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn
      icon
      @click="onAppReload"
    >
      <v-icon>mdi-sync</v-icon>
    </v-btn>

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
  </v-toolbar>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { collection, addDoc } from 'firebase/firestore/lite';
import { useCitiesStore } from '../stores/cities';
import { getCityWeather } from '../lib/api';
import db from '../firebase/firebase';

const props = defineProps<{
  isEdit: boolean
}>();

const citiesStore = useCitiesStore();

const emit = defineEmits<{
  cityAdd: [city: string],
  editToggle: [isEdit: boolean]
}>();

let dialog = toRef(false);
let city = toRef('');

async function onCityAdd() {
  const data = await getCityWeather(city.value);
  const newCity = {
    city: city.value,
    currentWeather: data
  };
  await addDoc(collection(db, "cities"), newCity);
  citiesStore.addCity(newCity);
}

const onAppReload = () => {
  location.reload();
}

const onEditToggle = () => {
  emit("editToggle", !props.isEdit);
}
</script>