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
    updateCity(cityId, newProps) {
      this.cities = this.cities.map((city) => {
        if (city.id === cityId) {
          city = {
            ...city,
            ...newProps
          }
          console.log('newCity', city)
        }
        return city;
      });
      console.log('this.cities', this.cities)
    },
    getCityByName(cityName:string):City {
      return this.cities.find((city) => city.location.name === cityName);
    },
    getCityById(cityId:string):City {
      return this.cities.find((city) => city.id === cityId);
    }
  }
})
