<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { db, auth, museums } from "../boot/firebase";
export default {
  name: "goodbye",

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
    msg() { 
      return this.name;
    },
  },
  mounted() {
    let projName = this.name;
    var cake = db.collectionGroup("projects").where("name", "==", projName);
    cake.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("dette er den rigtige " + doc.id, " => ", doc.data());
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>