<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
                          size="small"
                variant="text"
                icon="mdi-menu-down"
          v-bind="props"
        >
        
        </v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <!-- {{ store.myObject }} -->
          <v-list-item
            v-if="!store.myObject.photo"
            :prepend-avatar="Pic"
           :title="store.myObject.name"
          :subtitle="store.myObject.email"
          ></v-list-item>
          <v-list-item
            v-else
            :prepend-avatar="store.myObject.photo"
           :title="store.myObject.name"
          :subtitle="store.myObject.email"
          >

            <!-- <template v-slot:append>
              <v-btn
                variant="text"
                :class="fav ? 'text-green' : ''"
                icon="mdi-heart"
                @click="fav = !fav"
              ></v-btn>
            </template> -->
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      

        <v-list>
          <!-- <v-list-item>
            <v-switch
              v-model="message"
              color="green"
              label="Ativar menssagens"
              hide-details
            ></v-switch>
          </v-list-item> -->

          <v-list-item>
            <v-switch
              v-model="store.isDark"
              color="green"
              label="Modo Escuro"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            @click="menu = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="success"
            variant="text"
            @click="menu = false"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { userConfig } from '@/stores/user'
import Pic from "@/assets/user.png"
  export default {

      setup() {
    const store = userConfig()

    return { store }
  },
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      dark: true,
      userName: 'user',
      userEmail: 'email',
      Pic: Pic


    }),

    props: {
      myProp: {
        type: String,
        required: true
    }
  },

  methods: {
    changeMode(){
      this.store.isDark = this.dark
      console.log(this.store.isDark)
      }
      
    },

    mounted () {
      this.userName = this.store.myObject.name
      this.userEmail = this.store.myObject.email
  },

  computed: {
    now() {
      this.store.isDark = this.dark
      return console.log(this.store.isDark)
    }
  }

  





}
</script>