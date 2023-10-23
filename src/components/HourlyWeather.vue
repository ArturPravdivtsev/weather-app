<template>
	<div class="hourly-weather">
		<div class="container">
			<div class="hourly-temp" v-for="(weather, index) in forecast" :key="index">
				<div class="hour">
					<span>{{ getTime(weather.time) }}</span>
					<span>
						<img :src="getBigIcon(weather.condition.icon)" alt="" />
					</span>
					<span>{{ computed(() => round(weather[`temp_${settingsStore.temperatureUnit}`]) ) }}&deg;</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HourForecast } from '@/lib/types';
import { getBigIcon } from '@/lib/lib';
import { useSettingsStore } from '@/stores/settings';
import { round } from '@/lib/lib';

defineProps<{
  forecast: HourForecast[]
}>();

const settingsStore = useSettingsStore();

const getTime = (time:string) => {
  return new Date(time).toLocaleString("en-us", { hour: "numeric" })
};

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