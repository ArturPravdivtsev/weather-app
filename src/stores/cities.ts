import { defineStore } from 'pinia';
import type { City } from '@/lib/types';
import { CityItem } from '@/lib/types';

export type RootState = {
  cities: City[];
};

const initialState = () => {
  if (localStorage.getItem('savedCities')) {
    return JSON.parse(localStorage.getItem('savedCities'));
  }
  return [];
} 


export const useCitiesStore = defineStore('cities', {
  state: () =>({
    cities: initialState(),
  } as RootState),
  actions: {
    addCity(city:City) {
      this.cities.push(city);
    },
    removeCity(cityId:string) {
      this.cities = this.cities.filter((city:City) => city.id !== cityId)
    },
    getCityByName(cityName:string):City {
      console.log('this.cities', this.cities, cityName, this.cities.find(({ location }) => {
        console.log('location', location)
        return location.name === cityName}))
      return this.cities.find((city) => city.location.name === cityName) || CityItem;
    },
    getCityById(cityId:string):City {
      return this.cities.find((city) => city.id === cityId) || CityItem;
    }
  }
})
