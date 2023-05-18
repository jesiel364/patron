<template>
    User: {{ this.$route.params.id}}
</template>

<script>
export default {
    data() {
        corte: this.$route.params.id
    }
    ,
  mounted() {
    const userId = this.$route.params.id
    }
    // Faça algo com o parâmetro userId
 
  }

</script>