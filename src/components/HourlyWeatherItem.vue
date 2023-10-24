<template>
  <div class="hour">
    <span>{{ getTime(weather.time) }}</span>
    <span>
      <img :src="getBigIcon(weather.condition.icon)" :title="weather.condition.text" />
    </span>
    <span>{{ temp }}&deg;</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';
import type { HourForecast } from '@/lib/types';
import { useSettingsStore } from '@/stores/settings';
import { getBigIcon } from '@/lib/lib';
import { round } from '@/lib/lib';

const props = defineProps<{
  weather: HourForecast
}>();

const settingsStore = useSettingsStore();

const getTime = (time:string) => {
  return moment(time).format('HH');
};

const temp = computed(() => round(props.weather[`temp_${settingsStore.temperatureUnit}`]) );
</script>

<style>
.hour {
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 45px;
  margin-right: 30px;
}

.hour img {
  width: auto;
  height: 22px;
  display: block;
}

.hour span {
  display: block;
  align-self: center;
}

.hour span:nth-child(1) {
  font-weight: 300;
  margin-bottom: 12px;
}

.hour span:nth-child(2) {
  margin-bottom: 12px;
}

.hour span:nth-child(3) {
  font-weight: 500;
}
</style>