import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@mdi/font/css/materialdesignicons.css';
// import './assets/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import 'vuetify/styles';

const vuetify = createVuetify({
  components: {
    ...components,
    VSkeletonLoader
  },
  directives,
  theme: { defaultTheme: 'dark' },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
      mdi
    }
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
