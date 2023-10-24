<template>
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
      <p class="text-subtitle-1 ma-2">{{ tempMax }} <v-icon>mdi-thermometer-chevron-up</v-icon></p>
      <p class="text-subtitle-1 ma-2">{{ tempMin }} <v-icon>mdi-thermometer-chevron-down</v-icon></p>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';
import type { Forecastday } from '@/lib/types';
import { useSettingsStore } from '@/stores/settings';
import { round, getBigIcon } from '@/lib/lib';

const props = defineProps<{
  day: Forecastday
}>();

const settingsStore = useSettingsStore();

const getDay = (date: string) => {
  return moment(date).format('dddd');
} 

const tempMax = computed(() => round(props.day.day[`maxtemp_${settingsStore.temperatureUnit}`]) );
const tempMin = computed(() => round(props.day.day[`mintemp_${settingsStore.temperatureUnit}`]) );
</script>

<style scoped>
  .weather-icon {
    width: 50px;
  }
</style>