<template>
  <v-dialog
    v-model='dialog'
    width='800'
  >
    <template v-slot:activator='{ props }'>
      <v-btn
        v-if='isSimple'
        icon 
        v-bind='props'
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-card-text
        v-else
        align='center'
      >
        <p class='text-subtitle-1 mb-2'>No cities added, add a new one?</p>
        <v-btn v-bind='props'>
          Add city
        </v-btn>
      </v-card-text>
    </template>
    <v-card>
      <v-card-title>
        <span class='text-h5'>Enter location</span>
      </v-card-title>
      <v-card-text
        v-if='isExists'
        class='pr-4 pl-4'
      >
        <v-alert
          variant='outlined'
          density='compact'
          type='warning'
          text='City already exists!'
        ></v-alert>
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model='city'
          clearable
          hide-details='auto'
          label='City name'
          class='pa-2'
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color='success'
          @click='onCityAdd'
        >
          Add
          <v-icon icon='mdi-chevron-right' end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang='ts'>
import { toRef } from 'vue';
import { uid } from 'uid/single';
import { useCitiesStore } from '@/stores/cities';
import { getCityWeather } from '@/lib/api';
import { capitalizeFirstLetter } from '@/lib/lib';

export interface Props {
  isSimple?: boolean
}

withDefaults(defineProps<Props>(), {
  isSimple: true,
})

const citiesStore = useCitiesStore();

let dialog = toRef(false);
let city = toRef('');
let isExists = toRef(false);

async function onCityAdd() {
  isExists.value = citiesStore.checkCity(capitalizeFirstLetter(city.value.toLocaleLowerCase()));
  if (isExists.value) return;
  const weather = await getCityWeather(city.value);
  const newCityWeather = {
    id: uid(),
    ...weather
  };
  console.log('newCityWeather', newCityWeather);
  citiesStore.addCity(newCityWeather);
  dialog.value = false;
  city.value = '';
}
</script>