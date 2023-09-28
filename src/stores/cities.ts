import { defineStore } from 'pinia';
import type { City } from '../lib/types';

export type RootState = {
  cities: City[];
};


export const useCitiesStore = defineStore('cities', {
  state: () =>({
    cities: {},
  } as RootState),
  actions: {
    addCity(city:City) {
      this.cities = {...this.cities, ...city};
    },
    removeCity(cityId:string) {
      delete this.cities[cityId];
    }
  }
})
