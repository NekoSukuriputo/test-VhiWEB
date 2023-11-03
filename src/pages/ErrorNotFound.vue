<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div>
        <q-img
          src="~assets/404-illustration.svg"
          :ratio="1"
        />
      </div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        Oops. Nyasar...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/users"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
