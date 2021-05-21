<template>
  <div class="q-pa-md row">
    <q-form @submit="onSubmit" class="q-gutter-md col-10 r">
      <q-input filled v-model="title" label="Add todo..." />
    
  
    
      <q-btn label="Submit" type="submit" color="primary" />
  
      </q-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      this.addTodo(this.title);
    },
  },
};
</script>

<style>
</style>