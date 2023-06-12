import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { firestorePlugin } from 'vuefire'
import { createPinia } from 'pinia'

import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

app.component('VueDatePicker', VueDatePicker);

app.use(router).use(vuetify)
app.use(createPinia())
app.use(firestorePlugin)

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

app.mount('#app')
