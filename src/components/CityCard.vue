<template>
  <v-card
    max-width="368"
    min-width="290"
    class="pa-2 ma-2"
    @click="gotoWeather"
  >
    <v-card-item :title="props.city.location.name">
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h3"
          cols="6"
        >
          {{ temperature }}&deg;{{capitalizeFirstLetter(settingsStore.temperatureUnit)}}
        </v-col>

        <v-col cols="6" class="text-right">
          <v-img :src="icon" :title="description" />
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-windy"
      >
        <v-list-item-subtitle>{{ windSpeed }} km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-pouring"
      >
        <v-list-item-subtitle>{{ humidity }}%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <v-list class="bg-transparent">
          <v-list-item
            :title="tempMax"
            subtitle="Temperature max"
            append-icon="mdi-thermometer-chevron-up"
          >
          </v-list-item>
          <v-list-item
            :title="tempMin"
            subtitle="Temperature min"
            append-icon="mdi-thermometer-chevron-down"
          >
          </v-list-item>
          <v-list-item
            :title="feelsLike"
            subtitle="Temperature feels like"
            append-icon="mdi-thermometer-check"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="onExpandClick">
        {{ !expand ? 'Full Report' : 'Hide Report' }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isEdit"
        icon
        density="compact"
        variant="plain"
        @click="onDeleteClick"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { toRef, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import type { City } from '@/lib/types';
import { useCitiesStore } from '@/stores/cities';
import { useSettingsStore } from '@/stores/settings';
import { round, capitalizeFirstLetter, getBigIcon } from '@/lib/lib';

const props = defineProps<{
  city: City,
  isEdit: boolean
}>();

const citiesStore = useCitiesStore();
const settingsStore = useSettingsStore();

const router = useRouter();

let expand = toRef(false);
const temperature = computed(() => round(props.city.current[`temp_${settingsStore.temperatureUnit}`]) );
const icon:string = getBigIcon(props.city.current.condition.icon);
const description:string = capitalizeFirstLetter(props.city.forecast.forecastday[0].day.condition.text);
const windSpeed:number = round(props.city.current.wind_kph);
const humidity:number = props.city.current.humidity;
const detailed = props.city.forecast.forecastday[0].day;
const tempMax = computed(() => `${round(detailed[`maxtemp_${settingsStore.temperatureUnit}`])}\xB0${capitalizeFirstLetter(settingsStore.temperatureUnit)}` );
const tempMin = computed(() => `${round(detailed[`mintemp_${settingsStore.temperatureUnit}`])}\xB0${capitalizeFirstLetter(settingsStore.temperatureUnit)}` );
const feelsLike = computed(() => `${round(props.city.current[`feelslike_${settingsStore.temperatureUnit}`])}\xB0${capitalizeFirstLetter(settingsStore.temperatureUnit)}` );

const onExpandClick = () => {
  expand.value = !expand.value;
}

const onDeleteClick = async () => {
  // citiesStore.removeCity(props.city.id);
}

const gotoWeather = (evt: { target: { classList: [string] } }) => {
  // console.log('evt.target', evt.target, evt.target.classList, evt.target.classList[0] !== 'v-btn__content')
  if (evt.target.classList[0] !== 'v-btn__content') {
    router.push({ name: "city weather", params: { city: props.city.location.name } });
  }
}

</script>