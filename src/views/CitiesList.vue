<script setup lang='ts'>
import CityCard from '@/components/CityCard.vue';
import AddCityModal from '@/components/AddCityModal.vue';
import type { City } from '@/lib/types';

defineProps<{
  cities: City[],
  loading: boolean,
  isEdit: boolean
}>();
</script>

<template>
  <v-container fluid>
    <v-row v-if='loading'>
      <v-col
        v-for='(index) in 4'
        :key='index'
        sm='4'
        md='3'
      >
        <v-card
          height='300'
          max-width='368'
          class='pa-2 ma-2'
          :loading='true'
        ></v-card>
      </v-col>
    </v-row>
    <v-container v-else-if='cities.length === 0' class='d-flex justify-center'>
      <AddCityModal :isSimple='false' />
    </v-container>
    <v-row v-else>
      <v-col
        v-for='city in cities'
        :key='city.id'
        sm='4'
        md='3'
      >
        <CityCard
          :city='city'
          :isEdit='isEdit'
        />
      </v-col>
    </v-row>
  </v-container>
</template>