<template>
  <q-card
    flat
    class="card-users"
    bordered
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ first_name }}</q-item-label>
        <q-item-label caption>
          {{ last_name }}
        </q-item-label>
      </q-item-section>
      <q-space />
      <q-btn
        flat
        round
        color="primary"
        icon="visibility"
        @click="onDetail"
      >
        <q-tooltip>
          See Detail User
        </q-tooltip>
      </q-btn>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'

const props = defineProps({
  avatar: {
    type: String,
    default: 'https://cdn.quasar.dev/logo-v2/svg/logo.svg'
  },
  // eslint-disable-next-line vue/prop-name-casing
  first_name: {
    type: String,
    default: 'first_name'
  },
  // eslint-disable-next-line vue/prop-name-casing
  last_name: {
    type: String,
    default: 'last_name'
  },
  // eslint-disable-next-line vue/require-default-prop
  id: {
    type: Number,
    default: 1
  }
})

const emits = defineEmits(['handle-onDetail'])

const onDetail = () => {
  emits('handle-onDetail', props.id)
}
</script>

<style lang="scss" scoped>
.card-users{
  width: 100%;
  max-width: 250px;
}
</style>
