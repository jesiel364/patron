<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
<!--         <v-btn
          color="primary"
          v-bind="props"
        >
          Open Dialog
        </v-btn> -->
      </template>

      <v-card :theme="mode">
        <v-card-text>
         {{myProp[0].message}}

        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props: {
      myProp: {
        type: Array,
        required: false
      }
    },
    mounted(){
      this.dialog = this.myProp[0].dialog
      if(this.myProp[1]){
        this.mode = "dark"
      }else{
        this.mode = "light"
      }
    }
  }
</script>