<template>
  <div id="div1">
    <h2>Usuários</h2>
 
    <v-table class="rounded"  :theme="theme" id="table">
      <thead>
        <tr>
          <!-- <th class="text-left">ID</th> -->
          <!-- <th class="text-left">UID</th> -->
          <th  class="text-left">Nome</th>
          <th class="text-left">Email</th>
          <th class="text-left">Admin</th>

          <th class="text-left">Telefone</th>
          <th class="text-left">Foto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in myProp[0]">
<!--           <td>
            <small>{{ item.uid }}</small>
          </td> -->
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td v-if="item.superUser"><span class="mdi mdi-check"></span></td>
          <td v-else></td>
          <td>{{ item.phone }}</td>
          <td v-if="item.photo">
          
            <v-avatar color="grey" size="60" rounded="">
              <v-img :src="item.photo" cover></v-img>
            </v-avatar>
          </td>

          <td v-else>
            <v-avatar color="" size="60" rounded="">
              <v-img :src="userPic" cover></v-img>
            </v-avatar>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import userPic from '@/assets/user.png'

export default {
  computed:{
    theme(){
      if (this.myProp[1]) {
        return 'dark'
      } else{
        return 'light'
      }
    }
  },

  props: {
    myProp: {
      type: Array,
      required: true,
    },
 
  },
  
     data() {
    	return {
    		userPic: userPic,
    	}
    },
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  #table {
    /*    width: 100%;*/
    /*    background-color: blue;*/
    height: 100%;
    max-width: 600px;
  }
}
</style>
