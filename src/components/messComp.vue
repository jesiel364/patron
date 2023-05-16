  <template>
  
   
   <div class="message bg-brown">
            <div>
              <span id="author">{{ dict.author }}</span>
              <span id="date">{{ dict.date }}</span>
            </div>
  
            <div>
              <p id="mess">{{ dict.mess }}</p>
            </div>
  
          </div>
  
  
  
  </template>
  
  <script>
  
  export default {
   name: "messComp",
    props: {
      dict: {
        type: Object,
      },  
    }
  
  }
  
  
  </script>
  
  <style scoped>
    .message {
    /* background-color: brown; */
    margin-top: 42px;
    padding: 16px;
    border-radius: 25px;
  }
  
  .message p {
    /* color: #fefefe; */
  }
  
  #author {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #fefefe;
  }
  
  #date {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 200;
    color: #dfdfdf;
    padding-left: 16px;
  }
  
  #mess {
    /* font-family: 'Lato', sans-serif; */
    font-size: 14px;
    font-weight: 200;
    color: #fefefe;
    padding-top: 10px;
  }
      
  
    
  </style>