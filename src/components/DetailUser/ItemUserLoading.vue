<template>
  <q-card
    class="user-detail q-ma-md"
  >
    <q-card-section>
      <div class="row items-center justify-center q-py-md">
        <q-skeleton
          type="rect"
          animation="pulse"
          width="200px"
          height="200px"
        />
      </div>
      <div class="q-py-md">
        <div class="text-h6">
          <q-skeleton
            type="text"
            animation="pulse"
          />
        </div>
        <div class="text-subtitle2">
          <q-skeleton
            type="text"
            animation="pulse"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions vertical />
  </q-card>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.user-detail{
  width: 100%;
  height: 100%;
  max-width: 300px;
}
</style>
