<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 485px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="pressed" class="q-px-sm q-pt-xl q-pb-lg">
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
                required
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
                  type="submit"
                  unelevated
                  size="lg"
                  color="purple-4"
                  class="full-width text-white"
                  label="Get Started"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>

          <q-card-section class="text-right q-pa-sm">
            <q-btn to="/Login" color="amber" glossy label="To login" />
          </q-card-section>
          <transition
            appear
            enter-active-class="animated fadeIn slow"
            leave-active-class="animated fadeOut slow"
          >
            <q-card
              v-if="error"
              square
              elevated
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
        </q-card>
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
      email: "",
      password: "",
      displayName: "",
      error: "",
    };
  },
  methods: {
    /*     pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("It works");
          this.$router.replace({ name: "Secret" });
        })
        .catch((error) => (this.error = error));
    }, */
    pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)

        .then((cred) => {
          return db.collection("users").doc(this.email).set({
            displayName: this.displayName,
          });
        })
        /* .then((cred) => {
          let user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.displayName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          });
        }) */
        .then(() => {
          console.log("It works" + " " + this.displayName);
          this.$router.replace({ name: "Secret" });
        })
        .catch((error) => (this.error = error));
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