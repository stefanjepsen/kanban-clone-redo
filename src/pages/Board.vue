<template>
  <q-page>
    <!-- page content -->

    <div class="q-pa-md row">
      <div class="col-8 offset-2">
 

        <div class="row q-gutter-xs">
          
          <div  class="col-3 offset-1">
            <transition
              appear
              enter-active-class="animated fadeIn slow"
              leave-active-class="animated fadeOut slow"
            >
              <q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="">{{  }}</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

              </q-card>
            </transition>
          </div>
          <div  class="col-3 offset-1">
            <transition
              appear
              enter-active-class="animated fadeIn slow"
              leave-active-class="animated fadeOut slow"
            >
              <q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="">{{  }}</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

              </q-card>
            </transition>
          </div>
          <div  class="col-3 offset-1">
            <transition
              appear
              enter-active-class="animated fadeIn slow"
              leave-active-class="animated fadeOut slow"
            >
              <q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="">{{  }}</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

              </q-card>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md row q-gutter-md"></div>
  </q-page>
</template>

<script>


export default {
  name: "Board",
 
};
</script>

<style>

</style>