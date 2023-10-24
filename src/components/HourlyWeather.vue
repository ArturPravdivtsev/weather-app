<template>
	<div class="hourly-weather">
		<div class="container">
			<div class="hourly-temp" v-for="(weather, index) in forecast" :key="index">
				<HourlyWeatherItem :weather="weather"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { HourForecast } from '@/lib/types';
import HourlyWeatherItem from '@/components/HourlyWeatherItem.vue';

defineProps<{
  forecast: HourForecast[]
}>();

</script>

<style scoped>
.hourly-weather {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
}
.hourly-weather .container {
  display: flex;
  max-width: 100vw;
  overflow: scroll;
  padding: 0;
  margin: 0 20px;
}

.hourly-weather .container::-webkit-scrollbar {
  display: none;
}
</style>