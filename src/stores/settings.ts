import { defineStore } from 'pinia';
import { isCelcsius, isFahrenheit } from '@/lib/lib';

export const useSettingsStore = defineStore('settings', {
  state: () =>({
    temperatureUnit: 'c',
  }),
  actions: {
    getTemperatureUnit() {
      return this.temperatureUnit;
    },
    toggleTemperatureUnit() {
      if (isCelcsius(this.temperatureUnit)) return this.temperatureUnit = 'f';
      if (isFahrenheit(this.temperatureUnit)) return this.temperatureUnit = 'c';
    }
  }
})
