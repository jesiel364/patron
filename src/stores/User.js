import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userConfigs = defineStore('user', () => {
  const name = ref("João")
  const age = ref(32)
 

  return { name, age}
})