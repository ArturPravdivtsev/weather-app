<template>
  <v-btn
    icon
    @click="onChangeTemperatureUnit"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

let icon = computed(() => settingsStore.temperatureUnit === 'c' ? "mdi-temperature-celsius" : "mdi-temperature-fahrenheit");

const onChangeTemperatureUnit = () => {
  settingsStore.toggleTemperatureUnit();
}
</script>