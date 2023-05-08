<template>
  <div>
    <v-select
      v-model="selectedItems"
      :items="items"
     :iteitem-text="item.id"
      :item-value="id"
      label="name"
      multiple
    ></v-select>
    
    <v-card-subtext v-for="item in selectedItems" >
      {{item.name}}
    </v-card-subtext>
  </div>
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
