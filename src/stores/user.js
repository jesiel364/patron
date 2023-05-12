import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const userConfig = defineStore({
    id: 'myStore',
    state: () => ({
      myObject: {}

    }),
    actions: {
      setMyObject(newObject) {
        this.myObject = newObject
      }
    }
  })