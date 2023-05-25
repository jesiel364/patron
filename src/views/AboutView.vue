<template>
  <v-container class='' id='container'>
    <div class="mx-auto mb-0" id="frame">
    <v-card-text class='' id='title' theme='light'>
   <h1>   Yda Jean BarberShop </h1> 
   <h2 class="text-center mt-1" id='sub'>Expert em serviços de barba e cabelo</h2>

   <p id='text'>Na YDA JEAN Barbershop, oferecemos uma vasta gama de serviços profissionais de corte de cabelo e de cuidados de beleza para homens. Os nossos barbeiros experientes utilizam as mais recentes técnicas e ferramentas para lhe dar o visual perfeito. Quer necessite de um corte de cabelo clássico, de um corte de barba a direito ou de um corte de barba, temos tudo o que precisa.</p><br>

   <div class="" id='bt-div'>
   <v-btn to="/servicos" class='mx-auto' id='bt'>ver serviços</v-btn>
 </div>


</v-card-text>
<messComp class="mx-2 mb-3" :dict="message" />

  <v-row align="center px-2" justify="left">
      <v-col cols="auto">
        <v-btn href="https://instagram.com/ydajean?igshid=NTc4MTIwNjQ2YQ==" theme='dark' density="compact" icon="mdi-instagram"></v-btn>
      </v-col><v-col cols="auto">
        <v-btn theme='dark' density="compact" icon="mdi-facebook"></v-btn>
      </v-col>

     
    </v-row>
    


    
   </div>
  
    


</v-container>

</template>

<script>
import messComp from '../components/messComp.vue'

export default {
  components: {
    messComp
  },
  data() {
    return {
      items: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" }
      ],
      selectedItems: [],
      message: {

      author: 'Jean Pierre',
      date: '10, Mai 2023',
      mess: 'Funcionamos todos os dias das 8h ás 19h!'

    }
    };
  }
};
</script>

<style scoped>


  @import url('https://fonts.googleapis.com/css2?family=Karantina:wght@700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');



#title h1{
  

  width: 100%;


/* H1 */
/*background-color: RED;*/

font-family: 'Karantina';
font-style: normal;
font-weight: 700;
font-size: 34px;
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
font-size: 26px;
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

font-family: 'Inter', serif;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 200%;
/* or 32px */
text-align: justify;

/* Light Active */

color: #F2DAC2;

opacity: 0.72;
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
  width: 600px; 
}

@media(min-width: 800px) {
  #container {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../src/assets/bg1.jpg') no-repeat center center;
  background-size: cover;
  align-items: center;

  background-color: red;
  align-items: center;
  padding-top: 20PX;
  width: 100%;
  max-width: 100vw;
  height: 100%;

  }

  #frame{
/*  background-color: red;*/
/*  margin: 0px;*/
   
}

  #container{
     
    
/*    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url( '../src/assets/allef-vinicius-IvQeAVeJULw-unsplash.jpg') no-repeat center center;*/
    background-size: cover;
    background-color: red;
    transform: scale(1.1);
    align-items: center;
  }
}

@media(max-width: 800px) {
  #frame {
    min-width: 100px;
    width: 100%;
    margin: 20px;
  }

  .wrapper {

    width: 100%;
  }

  .divs {
    display: flex;
    flex-direction: column;
  }

  .box {
    margin-top: 30px;

  }

  #perfil-desc {
    margin-top: 20px;
    justify-content: center;
    text-align: center;
    line-height: .5;
    /*background-color: red;*/
  }

  #container {
/*    width: 100%;*/
    
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url( '../src/assets/bg1.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
/*    transform: scale(1.1);*/
    align-items: center;
    margin-bottom: 0;
    padding-bottom: 0;
  }

}
</style>


