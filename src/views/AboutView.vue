<template>
  <v-container class='p-0 m-0' theme='light' id='container'>
    <div class="mx-auto" id="frame">
    <v-card-text class='' id='title' theme='light'>
   <h1>   Yda Jean BarberShop </h1> 
   <h2 class="text-center mt-1" id='sub'>Expert em serviços de barba e cabelo</h2>

   <p id='text'>Na YDA JEAN Barbershop, oferecemos uma vasta gama de serviços profissionais de corte de cabelo e de cuidados de beleza para homens. Os nossos barbeiros experientes utilizam as mais recentes técnicas e ferramentas para lhe dar o visual perfeito. Quer necessite de um corte de cabelo clássico, de um corte de barba a direito ou de um corte de barba, temos tudo o que precisa.</p><br>

   <div class="" id='bt-div'>
   <v-btn class='mx-auto' id='bt'>ver serviços</v-btn>
 </div>


</v-card-text>


  <v-row align="center mx-2" justify="left">
      <v-col cols="auto">
        <v-btn theme='dark' density="compact" icon="mdi-instagram"></v-btn>
      </v-col><v-col cols="auto">
        <v-btn theme='dark' density="compact" icon="mdi-facebook"></v-btn>
      </v-col>

     
    </v-row>
   </div>
  
    


</v-container>

</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" }
      ],
      selectedItems: []
    };
  }
};
</script>

<style scoped>


  @import url('https://fonts.googleapis.com/css2?family=Karantina:wght@700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');



#container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url( '../src/assets/allef-vinicius-IvQeAVeJULw-unsplash.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
    transform: scale(1.1);
    margin: 0;
    padding: 0;

  }

#title h1{
  

  width: 100%;
  height: 81px;

/* H1 */
/*background-color: RED;*/

font-family: 'Karantina';
font-style: normal;
font-weight: 700;
font-size: 43px;
/*line-height: 65px;*/
/* identical to box height */

letter-spacing: 0.01em;
text-transform: uppercase;

/* Light Active */

color: #F2DAC2;

text-align: center;
margin: 0;
}

h2 {
  /* Expert Haircuts and Grooming Services */


 width: 100%;
height: 81px;

/* H2 */

font-family: 'Karantina';
font-style: normal;
font-weight: 400;
font-size: 30px;
line-height: 34px;
/* identical to box height */
letter-spacing: 0.001em;
text-transform: uppercase;

/* Active */

color: #977656;


/* Active */

color: #977656;
/*background-color: RED;*/

margin: 0 auto;

text-align: center;
}

#text{
/*background-color: red;*/
  width: 100%;
/*height: 160px;*/
  /* 16 Regular */

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 200%;
/* or 32px */
text-align: justify;

/* Light Active */

color: #F2DAC2;

opacity: 0.64;
margin: 0 auto;

}

#bt{
  
padding: 16px 24px;


width: 153px;
height: 52px;

/* Active */

background: #977656;
}

#bt-div{
/*  background-color: red;*/
  display: flex
  ;
}

#frame{
/*  background-color: red;*/
  margin: 20px;
  max-width: 400px;
  height: 100%;
  
}
</style>


