<template>
  <v-toolbar
    v-if="route.name === 'city weather'"
    density="comfortable"
    :elevation="8"
  >
    <AddCityModal />
    <v-spacer></v-spacer>
    <p>{{ date }}</p>
    <v-spacer></v-spacer>
    <v-btn
      icon
      @click="onChangeTemperatureUnit"
    >
      <v-icon>{{ getUnitIcon() }}</v-icon>
    </v-btn>
  </v-toolbar>
  <v-toolbar
    v-else
    density="comfortable"
    :elevation="8"
  >
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
    <AddCityModal />
  </v-toolbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import AddCityModal from '@/components/AddCityModal.vue';

const props = defineProps<{
  isEdit: boolean,
  temperatureUnit: string
}>();

const emit = defineEmits<{
  cityAdd: [city: string],
  editToggle: [isEdit: boolean],
  changeTemperatureUnit: []
}>();

const route = useRoute();
const weekDay:string = new Date().toLocaleDateString("en-us", { weekday: "short" });
const month:string = new Date().toLocaleDateString("en-us", { month: "short" });
const day:string = new Date().toLocaleDateString("en-us", { day: "2-digit" });
const date:string = `${weekDay}, ${month} ${day}`;

const getUnitIcon = () => {
  console.log('props.temperatureUnit', props.temperatureUnit)
  if (props.temperatureUnit === 'c') return "mdi-temperature-celsius";
  else return "mdi-temperature-fahrenheit";
}

const onAppReload = () => {
  location.reload();
}

const onEditToggle = () => {
  emit("editToggle", !props.isEdit);
}

const onChangeTemperatureUnit = () => {
  console.log('fififif')
  emit("changeTemperatureUnit");
}
</script>