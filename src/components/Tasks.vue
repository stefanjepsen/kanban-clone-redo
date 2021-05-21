<template>
  <div class="column q-pa-lg">
    <div class="row">
      <q-card square class="shadow-24" style="width: 100%; height: auto">
        <q-card-section class="bg-deep-purple-7">
          <h4 class="text-h5 text-white q-my-md">Tasks</h4>
        </q-card-section>
        <q-card-section class="">
          <q-input
            square
            clearable
            v-model="newToDo"
            type="text"
            label="Add Todo's"
          >
          </q-input>

          <q-btn :disable="!newToDo" v-if="(newTodo = !null)" @click="addTodo()"
            >Add</q-btn
          >

          <q-list v-for="(todo, i) in existingTodo" :key="i" separator>
            <q-item clickable v-ripple>
              <q-item-section>{{ i + 1 }}: {{ todo.text }}</q-item-section>
              <q-btn @click="deleteToDo">X</q-btn>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tasks",
  data() {
    return {
      newToDo: "",
      existingTodo: [
        /*     { text: "get gut at js", id: 0 },
        { text: "get laundry", id: 1 },
        { text: "walk dog laundry", id: 2 }, */
      ],
    };
  },
  methods: {
    addTodo() {
      this.existingTodo.push({
        text: this.newToDo,
        id: new Date().valueOf(),
      }),
        (this.newToDo = "");
    },
    deleteToDo(i) {
      this.existingTodo.splice(i, 1);
    },
  },
};
</script>

<style>
</style>