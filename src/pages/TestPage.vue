<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-form @submit.prevent="" class="">
          <q-stepper v-model="step" ref="stepper" color="primary" animated>
            <q-step
              :name="1"
              title="Select project settings"
              icon="settings"
              :done="step > 1"
            >
              <div class="q-gutter-md">
                <q-input
                  filled
                  v-model="name"
                  :rules="[(val) => !!val || 'Field is required']"
                  label="Project Name"
                />
                <q-input
                  filled
                  :rules="[(val) => !!val || 'Field is required']"
                  v-model="description"
                  label="Project Description"
                />
                <q-select v-model="tech" :options="options" label="Tech" />
                <q-field
                  filled
                  :hint="`Amount of hours expected for this project ${hoursAllocated}`"
                  :value="hoursAllocated"
                  @input="(val) => val === null && (hoursAllocated = 50)"
                  clearable
                >
                  <template v-slot:control>
                    <q-slider
                      :value="hoursAllocated"
                      @change="
                        (val) => {
                          hoursAllocated = val;
                        }
                      "
                      :rules="[(val) => val > 0]"
                      :min="0"
                      :max="100"
                      label
                      label-always
                      class="q-mt-lg"
                    />
                  </template>
                </q-field>
              </div>
            </q-step>

            <q-step
              :name="2"
              title="Create tasks"
              icon="create_new_folder"
              :done="step > 2"
            >
              <div class="column q-pa-lg">
                <div class="row">
                  <q-card
                    square
                    class="shadow-24"
                    style="width: 100%; height: auto"
                  >
                    <q-card-section class="bg-deep-purple-7">
                      <h4 class="text-h6 text-white q-my-sm">Tasks</h4>
                    </q-card-section>
                    <q-card-section class="">
                      <q-input
                        square
                        v-model="newToDo"
                        type="string"
                        label="Add Task name"
                      >
                      </q-input>
                      <q-input
                        square
                        autogrow
                        v-model="newTaskDescription"
                        type="string"
                        label="Add Task Description"
                      >
                      </q-input>

                      <q-field
                        filled
                        :hint="`Amount of hours expected for this task ${taskHours}`"
                        :value="taskHours"
                        @input="(val) => val === null && (taskHours = 50)"
                        clearable
                      >
                        <template v-slot:control>
                          <q-slider
                            :value="taskHours"
                            dense
                            @change="
                              (val) => {
                                taskHours = val;
                              }
                            "
                            :rules="[(val) => val > 0]"
                            :min="0"
                            :max="100"
                            label
                            label-always
                            class="q-mt-lg"
                          />
                        </template>
                      </q-field>

                      <q-btn
                        :disable="!newToDo || !newTaskDescription"
                        @click="addTodo()"
                        >Add</q-btn
                      >

                      <q-list v-for="(todo, i) in tasks" :key="i" separator>
                        <q-item clickable v-ripple>
                          <q-item-section
                            >{{ i + 1 }}: {{ todo.taskName }}</q-item-section
                          >
                          <q-btn size="sm" @click="deleteToDo">X</q-btn>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-step>
            <br />

            <q-step :name="3" title="Create a project" icon="add_comment">
              Lets do this!
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn
                  v-if="step < 3"
                  @click="$refs.stepper.next()"
                  color="primary"
                  label="Continue"
                  v-bind:disabled="
                    !name || !description || !tech || !hoursAllocated
                  "
                />

                <q-btn
                  v-if="step > 1"
                  flat
                  color="primary"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-ml-sm"
                />
                <q-btn
                  v-if="step === 3"
                  color="green"
                  type="submit"
                  label="Create Project"
                  class="q-ml-sm"
                  @click="addNewProject"
                  size="xl"
                  to="/Secret"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db, auth } from "../boot/firebase";

import firebase from "firebase";
import "firebase/auth";
export default {
  data() {
    return {
      step: 1,
      name: "",
      description: "",
      tech: "",
      hoursAllocated: null,
      taskHours: null,
      projects: [],

      options: [
        "Angular",
        "ASP.NET Core",
        "Express",
        "Gatsby",
        "Laravel",
        "React",
        "VueJS",
      ],

      newToDo: "",
      newTaskDescription: "",
      tasks: [
        /*    { taskName: "get gut at js", id: 0 },
        { taskName: "get laundry", id: 1 },
        { taskName: "walk dog laundry", id: 2 },  */
      ],
    };
  },

  methods: {
    addNewProject() {
      let newProject = {
        name: this.name,
        description: this.description,
        tech: this.tech,
        hoursAllocated: this.hoursAllocated,
        date: Date.now(),
        tasks: this.tasks,
      };

      db.collection("projects")
        .add(newProject)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          console.log(newProject);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      this.name = "";
      this.description = "";
      this.tech = "";
      this.tasks = "";
    },
    addTodo() {
      this.tasks.push({
        id: new Date().valueOf(),
        taskName: this.newToDo,
        taskDescription: this.newTaskDescription,
        status: false,
        taskHours: this.taskHours,
      }),
        (this.newToDo = "");
      this.newTaskDescription = "";
    },
    deleteToDo(i) {
      this.tasks.splice(i, 1);
    },

    mounted() {
      db.collection("projects").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let projectsChange = change.doc.data();

          if (change.type === "added") {
            console.log("New project: ", projectsChange);
            this.projects.unshift(projectsChange);
          }
          if (change.type === "modified") {
            console.log("Modified project: ", projectsChange);
          }
          if (change.type === "removed") {
            console.log("Removed project: ", projectsChange);
          }
        });
      });
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}

.error {
  color: red;
  font-size: 18px;
}
</style>