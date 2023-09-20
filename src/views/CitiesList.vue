<script setup lang="ts">
import CityCard from "../components/CityCard.vue";
defineProps<{
  cities: object[],
  loading: boolean,
  isEdit: boolean
}>();
</script>

<template>
  <v-container fluid>
    <v-row v-if="loading" no-gutters>
      <v-col
        v-for="(index) in 4"
        :key="index"
        sm="4"
        md="3"
      >
        <v-card
          height="300"
          max-width="368"
          class="pa-2 ma-2"
          :loading="true"
        ></v-card>
      </v-col>
    </v-row>
    <v-row v-else no-gutters>
      <v-col
        v-for="(city, index) in cities"
        :key="index"
        sm="4"
        md="3"
      >
        <CityCard
          :city="city"
          :isEdit="isEdit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
