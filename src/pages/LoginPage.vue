<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <q-dialog v-if="error">
        <q-card style="width: 300px">
          <q-card-section>
            <div class="text-h6">Small</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Click/Tap on the backdrop.
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-card square class="shadow-24" style="width: 300px; height: 485px">
        <q-card-section class="bg-deep-purple-7">
          <h4 class="text-h5 text-white q-my-md">Login</h4>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="pressed" class="q-px-sm q-pt-xl">
            <q-input
              square
              clearable
              v-model="email"
              type="email"
              label="Email"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              square
              clearable
              v-model="displayName"
              type="displayName"
              label="displayName"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              square
              clearable
              v-model="password"
              type="password"
              label="Password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                type="submit"
                size="lg"
                color="purple-4"
                class="full-width text-white"
                label="Sign In"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>

        <q-card-section class="text-right q-pa-sm">
          <q-btn
            to="/Register"
            class="bg-deep-purple-7"
            text-color="white"
            label="To Register"
          />
        </q-card-section>
      </q-card>

      <transition
        appear
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut slow"
      >
        <q-card
          v-if="error"
          square
          class="shadow-24 q-mt-lg"
          style="width: 300px"
        >
          <q-card-section>
            <div class="text-h6">Fejl 40</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ error }}
          </q-card-section>
        </q-card>
      </transition>
    </div>
  </q-page>
</template>

<script>
import { db, auth } from "../boot/firebase";

import firebase from "firebase";
import "firebase/auth";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      displayName: "",
      password: "",
      error: "",
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "Board" });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>