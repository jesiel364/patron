import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const userConfig = defineStore({
    id: 'myStore',
    state: () => ({
      myObject: {},
      agenda: {},
      isDark: true

    }),

    actions: {
      setMyObject(newObject) {
        this.myObject = newObject
      },
      setAgenda(newObject) {
        this.agenda = newObject
      },

     
    }
  })