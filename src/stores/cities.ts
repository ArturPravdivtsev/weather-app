import { defineStore } from 'pinia';
import type { City } from '@/lib/types';

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
      localStorage.setItem('savedCities', JSON.stringify(this.cities))
    },
    removeCity(cityId:string) {
      const newCitiesList = this.cities.filter((city:City) => city.id !== cityId);
      this.cities = newCitiesList;
      localStorage.setItem('savedCities', JSON.stringify(newCitiesList))
    },
    updateCity(cityId: string, newProps: object) {
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
    checkCity(cityName:string) {
      return !!this.getCityByName(cityName) || false;
    },
    getCityByName(cityName:string):City|undefined {
      return this.cities.find((city) => city.location.name === cityName);
    },
    getCityById(cityId:string):City|undefined {
      return this.cities.find((city) => city.id === cityId);
    }
  }
})
