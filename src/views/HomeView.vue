<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import db from '../firebase/firebase';
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore/lite';
// import TheWelcome from '../components/TheWelcome.vue'

const API_KEY = 'e8342fbc27f0c7142a735e56dc61c04b';
// const city = 'Moscow';
const cities:object[] = [];

async function getCityWeather() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);

  citySnapshot.docs.forEach(async (document) => {
    const city = document.data();
    // if (!city.currentWeather) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&units=metric&appid=${API_KEY}`
        );
        const data = response.data;
        const docRef = doc(db, 'cities', document.id);
        updateDoc(docRef, { currentWeather: data })
          .then(() => cities.push(city));
      } catch (err) {
        console.log(err)
      }
    // }
  });
}

onMounted(() => {
  getCityWeather();
})
</script>

<template>
  
</template>
