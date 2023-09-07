<script setup lang="ts">
import { toRefs } from 'vue'
import CityCard from "../components/CityCard.vue";
const props = defineProps<{
  cities: object[]
}>();

// const { cities } = toRefs(props);

// console.log('cities', cities.value);
</script>

<template>
  <v-container fluid>
    <v-row dense
      no-gutters>
      <v-col
        v-for="(city, index) in cities"
        :key="index"
        sm="4"
        md="3"
      >
        <CityCard
          :city="city"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
