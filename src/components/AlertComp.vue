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

      <v-card>
        <v-card-text>
         {{myProp.message}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
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
        type: Object,
        required: true
      }
    },
    mounted(){
      this.dialog = this.myProp.dialog
    }
  }
</script>