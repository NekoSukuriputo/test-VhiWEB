<template>
  <q-card
    flat
    class="card-users"
    bordered
  >
    <q-item>
      <q-item-section avatar>
        <q-skeleton
          type="circle"
          animation="pulse"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton
            type="text"
            animation="pulse"
          />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton
            type="text"
            animation="pulse"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.card-users{
  width: 100%;
  max-width: 250px;
}
</style>
