<template>
    <v-navigation-drawer v-model="drawer"
        
        
        theme="light"
      ><v-list>
          <v-list-item
          
            title="Yda Jean Barber"
            subtitle='@ydajean'
            
          >
            <template v-slot:append>
              
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item prepend-icon="mdi-home" :to="{path: '/'}" title="Inicio" ></v-list-item>
          <v-list-item prepend-icon="mdi-home" :to="{path: '/servicos'}" title="Serviços" ></v-list-item>
       <!--    <v-divider></v-divider>
          <v-list-item prepend-icon=" mdi-cog" :to="{path: '/config'}" title="Configurações"></v-list-item> -->
        </v-list>
      </v-navigation-drawer>
      <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Yda Jean Barber</v-toolbar-title>
     <!--  <v-btn :to="{path: '/'}" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn> -->
    </v-app-bar>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
  </script>