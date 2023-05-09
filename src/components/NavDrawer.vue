<template>
    <v-navigation-drawer v-model="drawer"
        
        
        theme="light"
      ><v-list>
          <v-list-item
          
            title="Yda Jean Barber"
            subtitle='@ydajean - Boa Vista, RR'
            
          >
            <template v-slot:append>
              
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item prepend-icon="mdi-home" :to="{path: '/'}" title="Inicio" ></v-list-item>
          <v-list-item prepend-icon="mdi-chair-rolling" :to="{path: '/sobre'}" title="Sobre" ></v-list-item>
       <!--    <v-divider></v-divider>
          <v-list-item prepend-icon=" mdi-cog" :to="{path: '/config'}" title="Configurações"></v-list-item> -->
        </v-list>
      </v-navigation-drawer>
      <v-app-bar>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
       <v-btn @click="drawer = !drawer" icon>
        <!-- <v-icon>mdi-razor-double-edge</v-icon> -->
        <v-icon>mdi-content-cut</v-icon>
      </v-btn>

      <v-toolbar-title class="text-subtitle-8 font-weight-black">Yda Jean Barber</v-toolbar-title>
     
    </v-app-bar>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
  </script>