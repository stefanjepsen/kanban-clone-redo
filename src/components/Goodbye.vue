<template>
  <q-page>
    <div class="row q-gutter-xl">
      <div class="col-10 offset-2">
        <h5>Project Name:</h5>
        <h4>{{ projectName }}</h4>
      </div>
    </div>

    <div class="row q-gutter-xl">
      <div class="col-10 offset-2">
        <q-card class="q-card-input q-pa-xl">
          <q-input
            style="max-width: 500px"
            v-model="newTask"
            required
            placeholder="Enter Task"
            @keyup.enter="addNewTodo"
          ></q-input>
          <br />
          <q-btn @click="addNewTodo" color="primary" class="ml-3">Add</q-btn>
        </q-card>
      </div>
    </div>
    <br />
    <br />

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
              class="cursor q-pa-md q-mt-xs q-card-todo"
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
              class="cursor q-pa-md q-mt-xs q-card-todo"
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
              class="cursor q-pa-md q-mt-xs q-card-todo"
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
              class="cursor q-pa-md q-mt-xs q-card-todo"
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

  props: {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  //["name", "description"],

  computed: {
    projectName() {
      return this.name;
    },
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
  created() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user.email);
      } else {
        // No user is signed in.
      }
    });
  },
  mounted() {
    let projName = this.name;
    var cake = db.collectionGroup("projects").where("name", "==", projName);
    cake.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("dette er den rigtige " + doc.id, " => ", doc.data());
      });
    });

    db.collection("todos")
      .where("belongToProject", "==", this.name)
      .onSnapshot((snapshot) => {
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
        db.collection("todos").doc(todo.id).update({
          status: "TODO",
          todo: todo.todo,
        });
      });
    },
    inProgress(value) {
      value.map((todo) => {
        db.collection("todos").doc(todo.id).update({
          status: "IN_PROGRESS",
          todo: todo.todo,
        });
      });
    },
    testing(value) {
      value.map((todo) => {
        db.collection("todos").doc(todo.id).update({
          status: "TESTING",
          todo: todo.todo,
        });
      });
    },
    completed(value) {
      value.map((todo) => {
        db.collection("todos").doc(todo.id).update({
          status: "COMPLETED",
          todo: todo.todo,
        });
      });
    },
  },

  methods: {
    addNewTodo() {
      let newTodo = {
        todo: this.newTask,
        status: "TODO",
        belongToProject: this.name,
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
}

.kanban-column {
  min-height: 500px;
  z-index: 1;
  min-width: 3vw;
}

.q-card-todo {
  width: auto !important;
}

.q-card-input {
  max-width: 80% !important;
}
</style>