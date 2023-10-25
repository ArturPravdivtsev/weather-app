<template>
	<div
    v-for='day in forecast.slice(1)'
    :key='day.date_epoch'
    class='d-flex py-3 justify-space-between'
  >
    <WeeklyWeatherItem :day='day' />
  </div>
</template>

<script setup lang='ts'>
import type { Forecastday } from '@/lib/types';
import WeeklyWeatherItem from '@/components/WeeklyWeatherItem.vue';

defineProps<{
  forecast: Forecastday[]
}>(); 
</script>