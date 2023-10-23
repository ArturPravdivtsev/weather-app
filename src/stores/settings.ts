import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () =>({
    temperatureUnit: 'c',
  }),
  actions: {
    getTemperatureUnit() {
      return this.temperatureUnit;
    },
    toggleTemperatureUnit() {
      // console.log('this.temperatureUnit', this.temperatureUnit)
      if (this.temperatureUnit === 'c') return this.temperatureUnit = 'f';
      if (this.temperatureUnit === 'f') return this.temperatureUnit = 'c';
    }
  }
})
