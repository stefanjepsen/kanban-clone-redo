<template>
  <q-page>
    <!-- page content -->

    <div class="q-pa-md row">
      <div class="col-8 offset-2">
        <div class="row q-gutter-xs">
          <div class="col-3 offset-1">
            <h5>To do</h5>
            <q-separator dark inset />
            <q-card> </q-card>
          </div>

          <div class="col-3 offset-1">
            <h5>Doing</h5>
            <q-separator dark inset />
          </div>

          <div class="col-3 offset-1">
            <h5>Done</h5>
            <q-separator dark inset />
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md row q-gutter-md"></div>
  </q-page>
</template>


<script>
import { db, auth } from "../boot/firebase";
export default {
  data() {
    return {};
  },
  methods() {
    db.collection("projects")
      
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>