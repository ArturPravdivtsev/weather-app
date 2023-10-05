import { defineStore } from 'pinia';
import type { City } from '@/lib/types';
import { CityItem } from '@/lib/types';

export type RootState = {
  cities: City[];
};


export const useCitiesStore = defineStore('cities', {
  state: () =>({
    cities: [],
  } as RootState),
  actions: {
    addCity(city:City) {
      this.cities.push(city);
    },
    removeCity(cityId:string) {
      this.cities = this.cities.filter((city:City) => city.id !== cityId)
    },
    getCityByName(cityName:string):City {
      return this.cities.find((city) => city.location.name === cityName) || CityItem;
    },
    getCityById(cityId:string):City {
      return this.cities.find((city) => city.id === cityId) || CityItem;
    }
  }
})
