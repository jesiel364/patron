<template>
  <div id="div1">
    <h2>Usuários</h2>
    <v-table id="table">
      <thead>
        <tr>
          <!-- <th class="text-left">ID</th> -->
          <th class="text-left">UID</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Email</th>
          <th class="text-left">Administrado</th>

          <th class="text-left">Telefone</th>
          <th class="text-left">Foto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in myProp">
          <td>
            <small>{{ item.uid }}</small>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td v-if="item.superUser">✅</td>
          <td v-else>❌</td>
          <td>{{ item.phone }}</td>
          <td v-if="item.photo">
          
            <v-avatar color="grey" size="60" rounded="">
              <v-img :src="item.photo" cover></v-img>
            </v-avatar>
          </td>

          <td v-else>
            <v-avatar color="grey" size="60" rounded="">
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
  props: {
    myProp: {
      type: String,
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
