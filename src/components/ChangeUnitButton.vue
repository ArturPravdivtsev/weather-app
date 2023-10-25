<template>
  <v-btn
    icon
    @click='onChangeTemperatureUnit'
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { isCelcsius } from '@/lib/lib.js';

const settingsStore = useSettingsStore();

let icon = computed(() => isCelcsius(settingsStore.temperatureUnit) ? 'mdi-temperature-celsius' : 'mdi-temperature-fahrenheit');

const onChangeTemperatureUnit = () => {
  settingsStore.toggleTemperatureUnit();
}
</script>