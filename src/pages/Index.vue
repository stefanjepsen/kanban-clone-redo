<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <span class="lollerik">Lord and Saviour</span>

      <img
        class="rounded-borders"
        alt="Leif Ham selv"
        src="https://em-epi-static.azureedge.net/altdk-media/cb22b6b2b69d4168b23cda532b23c748/2a7ef8c0f735471bbb1fe3d7579d4254.jpg"
      />
      <q-btn
        to="/Register"
        class="bg-deep-purple-7"
        text-color="white"
        label="To Register"
      />
    </div>

    <br />
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
};
</script>

<style scoped>
.lollerik {
  font-size: 80px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6,
    0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
  animation: blinker 3s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
