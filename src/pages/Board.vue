<template>
  <q-page>
    <div v-if="posts.length">
      <q-card v-for="post in posts" :key="post.id">
        <h4>{{ post.name }}</h4>
        <p>{{ post.description }}</p>
        <ul>
          <li>comments {{ post.tasks }}</li>
        </ul>
        <router-link
          class="link"
          :to="{ path: '/goodbye', query: { name: post.name, description: post.description } }"
          >Say goodbye</router-link
        >
        <br />
     
      </q-card>
    </div>
    <div v-else>
      <p>There are currently no posts</p>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";
import { db, auth, museums } from "../boot/firebase";
export default {
  data() {
    return {
      projects: [],
      posts: [],
    };
  },
  methods: {
    getPosts: function () {
      db.collectionGroup("projects")
        .where("projCreator", "==", "kk@live.dkk")
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

<style lang="scss">
</style>

export const dbMenuAdd = db.collection('menuItems');