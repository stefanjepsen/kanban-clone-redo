<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar  class="bg-deep-purple-7">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>{{ $route.name }} </q-toolbar-title>

        <q-toolbar-title class="text-right">
          Logged in &bull;
          <span class="q-pa-sm" v-if="loggedIn">Yes</span>
          <span class="q-pa-sm" v-else>No</span>

          <q-btn
            v-if="!loggedIn"
            color="secondary"
            to="/Login"
            label="Log in"
            class=""
          >
            <q-tooltip content-class="bg-accent">Sign me out of here</q-tooltip>
          </q-btn>
          <q-btn
            v-if="loggedIn"
            color="secondary"
            @click="signOut"
            label="Sign out"
            class=""
          >
            <q-tooltip content-class="bg-accent">Sign me out of here</q-tooltip>
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      overlay
      content-class="bg-grey-1"
    >
      <div class="text-right">
        <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen"
          ><strong>X</strong></q-btn
        >
      </div>

      <q-list>
        <q-item to="/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item to="/Board" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Board</q-item-section
          >
        </q-item>

        <q-item to="/login" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="login" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Login</q-item-section
          >
        </q-item>

        <q-item to="/register" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="how_to_reg" size="sm" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Register</q-item-section
          >
        </q-item>

        <q-item to="/test" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="how_to_reg" size="sm" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold">Test</q-item-section>
        </q-item>

        <q-item to="/Secret" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="how_to_reg" size="sm" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold"
            >Secret</q-item-section
          >
        </q-item>

        <q-item to="/TestPage" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="lightbulb" class="lightbulb" size="sm" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold"
            >Test Board Page</q-item-section
          >
        </q-item>

        <q-item to="/TestingPurpose" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="lightbulb" class="lightbulb" size="sm" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold"
            >Test Board Page</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { db, auth } from "../boot/firebase";
import firebase from "firebase";
import "firebase/auth";
export default {
  name: "MainLayout",
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      //this.loggedIn = !!user;

      if (user) {
        this.loggedIn = true;
        let user = firebase.auth().currentUser;
        var docRef = db.collection("users").doc(user.email);
        docRef.get().then((doc) => {
          if (doc.exists) {
            console.log("Nickname:", doc.data());
          } else {
            // doc.data() will be undefined in this case
          }
        });
      } else {
        this.loggedIn = false;
      }
    });
  },
  data() {
    return {
      leftDrawerOpen: false,
      loggedIn: false,
      signedOut: false,
    };
  },
  methods: {
    async signOut() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.replace({ name: "Login" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>