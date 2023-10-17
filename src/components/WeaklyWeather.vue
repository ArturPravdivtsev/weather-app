<template>
	<div
    v-for="day in forecast.slice(1)"
    :key="day.date_epoch"
    class="d-flex py-3 justify-space-between"
  >
    <v-list-item
      density="compact"
    >
      <v-list-item-subtitle>{{ getDay(day.date) }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item
      density="compact"
    >
      <img class="weather-icon" :src="getBigIcon(day.day.condition.icon)" :title="day.day.condition.text" />
    </v-list-item>

    <v-list-item
      :title="round(day.day.maxtemp_c)"
      append-icon="mdi-thermometer-chevron-up"
    >
    </v-list-item>
    <v-list-item
      :title="round(day.day.mintemp_c)"
      append-icon="mdi-thermometer-chevron-down"
    >
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import type { Forecastday } from '@/lib/types';
import { round, getBigIcon } from '@/lib/lib';
const props = defineProps<{
  forecast: Forecastday[]
}>();

const getDay = (date: string) => {
  return new Date(date).toLocaleString("en-us", { weekday: "long" });
} 
</script>

<style scoped>
.weather-icon {
  width: 50px;
}
</style>