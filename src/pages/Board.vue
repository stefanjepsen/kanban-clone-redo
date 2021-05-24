<template>
  <q-page>
    <div class="col-10 offset-2">
      <div class="row q-gutter-xl justify-center">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            v-for="post in posts"
            :key="post.id"
            dark
            bordered
            class="bg-deep-purple-7"
            text-color="white"
          >
            <q-card-section>
              <div class="text-h5">{{ post.name }}</div>
              <div class="text-subtitle2">{{ post.description }}</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
              <q-btn
                :to="{
                  path: '/Project',
                  query: { name: post.name, description: post.description, hoursAllocated: post.hoursAllocated, tech: post.tech },
                }"
                >To the project</q-btn
              >
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="col-10 offset-2">
      <div class="row q-gutter-xl justify-center">
        <div v-if="posts.length"></div>

        <div v-else>
          <div class="q-pa-md">
            <q-card class="my-card">
              
              <q-video style="height:40vh;" src="https://www.youtube.com/embed/xFrGuyw1V8s" />

              <q-card-section>
                <div class="text-h6">Sorry no projects found</div>
                <q-btn to="/ProjectCreationPage">Create some</q-btn>
              </q-card-section>


            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";
import { db, auth, museums } from "../boot/firebase";
import "firebase/auth";
export default {
  data() {
    return {
      projects: [],
      posts: [],
    };
  },

  methods: {
    getPosts() {
      var user = firebase.auth().currentUser;
      var email;

      if (user != null) {
        email = user.email;
      }

      console.log(email);
      db.collectionGroup("projects")
        .where("projCreator", "==", email)
        .onSnapshot((querySnapshot) => {
          let postsArray = [];

          querySnapshot.forEach((doc) => {
            let post = doc.data();
            post.id = doc.id;
            postsArray.push(post);
          });

          this.posts = postsArray;
        });
    },
  },

  beforeMount() {
    this.getPosts();
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }

    console.log(email);
  },
  mounted() {
    /*         db.collection("projects").doc('facebook')
      .then((snap) => {
        const projects = [];
        snap.forEach((doc) => {
          projects.push({ [doc.id]: doc.get("tasks") });
        });
        this.projects = projects;
        console.log(projects)
      });  */
    /*     db.collection("projects")
      .doc("facebook")
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
      }); */
  },
};
</script>

<style lang="sass" scoped>

</style>
