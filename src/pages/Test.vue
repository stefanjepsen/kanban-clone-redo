<template>
  <q-page>
    <!-- page content -->

    <div class="row">
      <div class="col-10 offset-2">
        <h4>Project name</h4>
        <q-input
          style="max-width: 500px"
          v-model="newTask"
          required
          placeholder="Enter Task"
          @keyup.enter="add"
        ></q-input>
        <q-input
          style="max-width: 500px"
          v-model="newTaskDescription"
          required
          placeholder="Enter Task description"
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
              @click="deleteToDo(id) "
              class="q-pa-md q-mt-xs"
              v-for="(element, id) in arrBacklog"
              :key="id"
            >
          {{ element.name }}
          
            </q-card>
            
          </draggable>
        </div>

        <div class="col-2" style="background: lightblue">
          <h3 class="q-pa-sm">doing</h3>

          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
          >
            <q-card
              @click="elementClicked(element)"
              class="q-pa-md q-mt-xs"
              v-for="element in arrInProgress"
              :key="element.name"
              v-bind:element="element.name"
            >
              {{ element.name }}
            </q-card>
          </draggable>
        </div>

        <div class="col-2" style="background: pink">
          <h3 class="q-pa-sm">Testing</h3>

          <draggable
            class="list-group kanban-column"
            :list="arrTested"
            group="tasks"
          >
            <q-card
              @click="elementClicked(element)"
              class="q-pa-md q-mt-xs"
              v-for="element in arrTested"
              :key="element.name"
            >
              {{ element.name }}
            </q-card>
          </draggable>
        </div>

        <div class="col-2" style="background: grey">
          <h3 class="q-pa-sm">Done</h3>

          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
          >
            <q-card
              @click="elementClicked(element)"
              class="q-pa-md q-mt-xs"
              v-for="element in arrDone"
              :key="element.name"
            >
              {{ element.name }}
            </q-card>
          </draggable>
        </div>
      </div>
    </div>

    <!-- Laver dialogen som binder props på det pågældende card -->
    <q-dialog v-model="dialogForm">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Change Task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>{{ name }}</p>
          <p>{{ desc }}</p>
          <q-input v-model="name" label="Standard" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Edit"
            v-on:click="update"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md row q-gutter-md"></div>
  </q-page>
</template>

<script>
import { draggable } from "../boot/vuedraggable";

let nextTodoId = 1;
export default {
  components: {
    draggable,
  },
  data() {
    return {
      dialogForm: false,
      newTask: "",
      newTaskDescription: "",
      arrBacklog: [
        {
          id: "0",
          name: "Code some diller",
          desc: "Harro",
        },
        { name: "Code some cake" },
        { name: "Code some fake" },
        { name: "Code some make" },
      ],
      arrInProgress: [],
      arrTested: [],
      arrDone: [],
    };
  },
  methods: {
    getPostData(event, id) {
      console.log(event, id);
    },
    add() {
      if (this.newTask || this.newTaskDescription) {
        this.arrBacklog.push({
          id: nextTodoId++,
          name: this.newTask,
          desc: this.newTaskDescription,
        });
        this.newTask = "";
        this.newTaskDescription = "";
      }
    },
    elementClicked: function (element) {
      this.name = element.name;
      this.desc = element.desc;
      this.id = element.id;
      this.dialogForm = !this.dialogForm;
    },
    update() {
      console.log(this.id);
    },

    deleteToDo(id) {
      this.element.splice(id, 1);
    },

    /*     update(e) {
      e.preventDefault();
      console.log(this.name);
      console.log(this.name);
      console.log(this.desc);
      this.element.filter(() => {
        if (this.id == this.id) {

        }
      })
    } */
  },
  computed: {
    filterProjectsonUserId() {
      // map , filter
    }
  }
};
</script>

<style>
.kanban-column {
  min-height: 500px;
  z-index: 1;
}
</style>