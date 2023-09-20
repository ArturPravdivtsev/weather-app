import { defineStore } from 'pinia';
import type { City } from '../lib/lib';

export type RootState = {
  cities: City[];
};


export const useCitiesStore = defineStore('cities', {
  state: () =>({
    cities: [],
  } as RootState),
  actions: {
    addCity(city:City) {
      this.cities = [...this.cities, city];
    },
    removeCity(cityName:string) {
      this.cities.filter((city:City) => city.city !== cityName);
    }
  }
})
