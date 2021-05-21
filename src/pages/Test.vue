<template>
  <q-page>
    <!-- page content -->

    <div class="row">
      <div class="col-10 offset-2">
        <h4>Project name</h4>
        <q-input
          v-model="newTask"
          required
          placeholder="Enter Task"
          @keyup.enter="add"
        ></q-input>
        <q-btn @click="add" color="primary" class="ml-3">Add</q-btn>
      </div>
    </div>

    <div class="col-10 offset-2">
      <div class="row q-gutter-xl justify-center">
        <div class="col-2" style="background: grey">
          <h3 class="q-pa-sm">To do</h3>

          <draggable
            class="list-group kanban-column"
            :list="arrBacklog"
            group="tasks"
          >
            <q-card
              @click="elementClicked(element)"
              class="q-pa-md q-mt-xs"
              v-for="element in arrBacklog"
              :key="element.name"
            >
              {{ element.name }}
            </q-card>
          </draggable>
        </div>

        <div class="col-2">
          <h5>Doing</h5>
          <q-separator dark inset />
          <q-card>
            <draggable
              class="list-group kanban-column"
              :list="arrInProgress"
              group="tasks"
            >
              <div
                class="list-group-item"
                v-for="element in arrInProgress"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable></q-card
          >
        </div>

        <div class="col-2">
          <h5>test</h5>
          <q-separator dark inset />
          <q-card>
            <draggable
              class="list-group kanban-column"
              :list="arrTested"
              group="tasks"
            >
              <div
                class="list-group-item"
                v-for="element in arrTested"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable></q-card
          >
        </div>

        <div class="col-2">
          <h5>Done</h5>
          <q-separator dark inset />
          <q-card>
            <draggable
              class="list-group kanban-column"
              :list="arrDone"
              group="tasks"
            >
              <div
                class="list-group-item"
                v-for="element in arrDone"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable></q-card
          >
        </div>
      </div>
    </div>

    <!-- Laver dialogen som binder props på det pågældende card -->
    <q-dialog v-model="alert">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Change Task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>{{ name }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md row q-gutter-md"></div>
  </q-page>
</template>

<script>
import { draggable } from "../boot/vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      alert: false,
      newTask: "",
      arrBacklog: [
        { name: "Code some diller" },
        { name: "Code some cake" },
        { name: "Code some fake" },
        { name: "Code some make" },
        { name: "Ingen tjuterpsil intil du er done" },
      ],
      arrInProgress: [],
      arrTested: [],
      arrDone: [],
    };
  },
  methods: {
    add() {
      if (this.newTask) {
        this.arrBacklog.push({ name: this.newTask });
        this.newTask = "";
      }
    },
    elementClicked: function (element) {
      this.name = element.name;
      this.alert = !this.alert;
    },
  },
  mounted() {
    db.collection("projects")
      .where("state", "==", "CA")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
  },
};
</script>

<style>
.kanban-column {
  min-height: 500px;
  z-index: 1;
}
</style>