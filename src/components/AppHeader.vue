<template>
  <v-toolbar
    v-if="route.name === 'city weather'"
    density="comfortable"
    :elevation="8"
  >
    <AddCityModal />
    <v-spacer></v-spacer>
    <p>{{ date }}</p>
    <v-spacer></v-spacer>
    <ChangeUnitButton />
  </v-toolbar>
  <v-toolbar
    v-else
    density="comfortable"
    :elevation="8"
  >
    <v-toolbar-title>Weather App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      icon
      @click="onEditToggle"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      icon
      @click="onAppReload"
    >
      <v-icon>mdi-sync</v-icon>
    </v-btn>
    <ChangeUnitButton />
    <AddCityModal />
  </v-toolbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import moment from 'moment';
import AddCityModal from '@/components/AddCityModal.vue';
import ChangeUnitButton from '@/components/ChangeUnitButton.vue';

const props = defineProps<{
  isEdit: boolean
}>();

const emit = defineEmits<{
  cityAdd: [city: string],
  editToggle: [isEdit: boolean]
}>();


const route = useRoute();

const date:string = moment().format('ddd, MMM D');

const onAppReload = () => {
  location.reload();
}

const onEditToggle = () => {
  emit("editToggle", !props.isEdit);
}
</script>