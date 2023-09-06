<template>
  <!-- <header class="sticky top-0">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">

    </nav>
  </header> -->
  <v-toolbar
    density="comfortable"
    :elevation="8"
  >
    <v-btn icon>
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-toolbar-title>Weather App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>
  
<script setup lang="ts">

</script>