<template>
<div id="div1">  
  <h2>Usuários </h2>
  <v-table theme='dark' id='table'>


  
    <thead>
      <tr>
        <!-- <th class="text-left">ID</th> -->        
        <th class="text-left">UID</th>
        <th class="text-left">Nome</th>
        <th class="text-left">Email</th>

        <th class="text-left">Telefone</th>
        <th class="text-left">Foto</th>
      

      </tr>
    </thead>
    <tbody>
      <tr v-for="item in myProp" >
        <td>{{ item.uid }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td><small>{{ item.photo }}</small></td>
      </tr>
    </tbody>
  </v-table>
</div>
</template>

<script>

export default{
      props: {
    myProp: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

@media screen and (min-width: 768px){
    #table{
/*    width: 100%;*/
/*    background-color: blue;*/
    height: 100%;
    max-width: 600px;
  }
}
</style>