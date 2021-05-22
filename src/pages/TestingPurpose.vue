<template>
  <q-page>
    <div class="row q-mb-lg">
      <div class="col-10 offset-2">
        <h4>Project name</h4>
        <q-input
          style="max-width: 500px"
          v-model="newTask"
          required
          placeholder="Enter Task"
          @keyup.enter="addNewTodo"
        ></q-input>

        <q-btn @click="addNewTodo" color="primary" class="ml-3">Add</q-btn>
      </div>
    </div>

    <div class="col-10 offset-2">
      <div class="row q-gutter-xl justify-center">
        <div class="col-2" style="background: grey">
          <h3 class="q-pa-sm">To do</h3>

          <draggable
            class="list-group kanban-column"
            :list="todos"
            group="tasks"
            ghostClass="on-drag"
            animation="400"
          >
            <q-card
              class="cursor q-pa-md q-mt-xs"
              v-for="todo in todos"
              :key="todo.id"
            >
              {{ todo.todo }}
            </q-card>
          </draggable>
        </div>

        <div class="col-2" style="background: lightblue">
          <h3 class="q-pa-sm">In progress</h3>
          <draggable
            class="list-group kanban-column"
            :list="inProgress"
            group="tasks"
            ghostClass="on-drag"
            animation="400"
          >
            <q-card
              class="cursor q-pa-md q-mt-xs"
              v-for="todo in inProgress"
              :key="todo.id"
            >
              {{ todo.todo }}
            </q-card>
          </draggable>
        </div>

        <div class="col-2" style="background: purple">
          <h3 class="q-pa-sm">Testing</h3>
          <draggable
            class="list-group kanban-column"
            :list="testing"
            group="tasks"
            ghostClass="on-drag"
            animation="400"
          >
            <q-card
              class="cursor q-pa-md q-mt-xs"
              v-for="todo in testing"
              :key="todo.id"
            >
              {{ todo.todo }}
            </q-card>
          </draggable>
        </div>

        <div class="col-2" style="background: pink">
          <h3 class="q-pa-sm">completed</h3>
          <draggable
            class="list-group kanban-column"
            :list="completed"
            group="tasks"
            animation="400"
            ghostClass="on-drag"
          >
            <q-card
              class="cursor q-pa-md q-mt-xs"
              v-for="todo in completed"
              :key="todo.id"
            >
              {{ todo.todo }}
            </q-card>
          </draggable>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { draggable } from "../boot/vuedraggable";
import firebase from "firebase";
import { db, auth } from "../boot/firebase";

export default {
  components: {
    draggable,
    firebase,
  },
  data() {
    return {
      newTask: "",
      todos: [
        /*     {
          id: 1,
          todo: "Read a book",
        },
        {
          id: 2,
          todo: "Read a plante",
        },
        {
          id: 3,
          todo: "Read a spork",
        }, */
      ],
      inProgress: [
        /*  {
          id: 4,
          todo: "learn vue",
        }, */
      ],
      testing: [],
      completed: [
        /*         {
          id: 5,
          todo: "Eat some cake",
        }, */
      ],
    };
  },
  mounted() {
    this.db.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          if (change.doc.data().status === "TODO") {
            this.todos.push({
              id: change.doc.id,
              ...change.doc.data(),
            });
          } else if (change.doc.data().status === "COMPLETED") {
            this.completed.push({
              id: change.doc.id,
              ...change.doc.data(),
            });
          } else if (change.doc.data().status === "TESTING") {
            this.testing.push({
              id: change.doc.id,
              ...change.doc.data(),
            });
          } else {
            this.inProgress.push({
              id: change.doc.id,
              ...change.doc.data(),
            });
          }
        }
      });
    });
  },
  watch: {
    todos(value) {
      value.map((todo) => {
        this.db.doc(todo.id).update({
          status: "TODO",
          todo: todo.todo,
        });
      });
    },
    inProgress(value) {
      value.map((todo) => {
        this.db.doc(todo.id).update({
          status: "IN_PROGRESS",
          todo: todo.todo,
        });
      });
    },
    testing(value) {
      value.map((todo) => {
        this.db.doc(todo.id).update({
          status: "TESTING",
          todo: todo.todo,
        });
      });
    },
    completed(value) {
      value.map((todo) => {
        this.db.doc(todo.id).update({
          status: "COMPLETED",
          todo: todo.todo,
        });
      });
    },
  },
  computed: {
    db() {
      return firebase.firestore().collection("todos");
    },
  },
  methods: {
    addNewTodo() {
      let newTodo = {
        todo: this.newTask,
        status: "TODO",
      };
      db.collection("todos")
        .add(newTodo)
        .then(function (docRef) {
          console.log("TODO LAVET: ", docRef.id);
          console.log(newTodo);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      this.newTask = "";
    },
  },
};
</script>

<style>
.cursor {
  cursor: move;
}

.on-drag {
  background-color: #ffd8c8;
  color: black;
  z-index: 10;
}
</style>