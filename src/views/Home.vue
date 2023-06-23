<template>
  <v-container class='' id='container'>
    <div class="mx-auto mb-0" id="frame">
    <v-card-text class='' id='title' theme='light'>
   <h1>   YdaJean BarberShop </h1> 

   <h2 class="text-center mt-1" id='sub'>Expert em serviços de barba e cabelo</h2>

   <p id='text'>"Desperte seu estilo na Barbearia <strong>YDAJEAN</strong>: Cortes precisos, barbas impecáveis e um ambiente único. Nossos barbeiros especializados estão prontos para transformar sua aparência. Descubra a excelência em cuidados masculinos e garanta um visual impecável.</p> 
   
   <p id='text'>Agende seu horário e experimente a arte da barbearia no seu melhor. Venha para a Barbearia <strong>YdaJean</strong> e deixe-nos cuidar do seu estilo com maestria."</p><br>

   <div class="" id='bt-div'>
   <v-btn to="/servicos" class='mx-auto' id='bt'>Ver serviços</v-btn>
 </div>


</v-card-text>
<messComp class="mx-2 mb-3" :dict="message" />

  <v-row>
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
/* font-style: italic; */
font-weight: 700;
font-size: 75px;
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
font-size: 33px;
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

font-size: 16px;
    font-weight: 200;
    color: #fefefe;
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

#container {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80') no-repeat center center;

  background-size: cover;
  backdrop-filter: blur(200px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px);
}

@media(min-width: 700px) {
  #container {

  align-items: center;

  background-color: red;
  align-items: center;
  padding-top: 20PX;
  width: 100%;
  max-width: 100vw;
  height: 100%;

  }


}  

@media(max-width: 700px) {
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
    
   
    background-color: red;
/*    transform: scale(1.1);*/
    align-items: center;
    margin-bottom: 0;
    padding-bottom: 0;
  }

}
</style>


