<template>
	<div
    v-for="day in forecast.slice(1)"
    :key="day.date_epoch"
    class="d-flex py-3 justify-space-between"
  >
    <v-list-item
      density="compact"
      min-width="100"
    >
      <v-list-item-subtitle>{{ getDay(day.date) }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item
      density="compact"
    >
      <img class="weather-icon" :src="getBigIcon(day.day.condition.icon)" :title="day.day.condition.text" />
    </v-list-item>

    <div class="d-flex justify-space-between">
      <v-list class="bg-transparent d-inline-flex">
        <p class="text-subtitle-1 ma-2">{{ round(day.day.maxtemp_c) }} <v-icon>mdi-thermometer-chevron-up</v-icon></p>
        <p class="text-subtitle-1 ma-2">{{ round(day.day.mintemp_c) }} <v-icon>mdi-thermometer-chevron-down</v-icon></p>
      </v-list>
    </div>
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