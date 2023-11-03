<template>
  <q-card
    class="user-detail q-ma-md"
  >
    <q-card-section>
      <div class="row items-center justify-center q-py-md">
        <q-avatar
          rounded
          size="200px"
        >
          <img :src="avatar">
        </q-avatar>
      </div>
      <div class="q-py-md">
        <div class="text-h6">
          {{ first_name }} {{ last_name }}
        </div>
        <div class="text-subtitle2">
          {{ email }}
        </div>
      </div>
    </q-card-section>
    <q-card-actions vertical>
      <q-btn
        color="primary"
        outline
        @click="onBackToList"
      >
        Back To List
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import {
  defineProps
} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  email: {
    type: String,
    default: 'email'
  }
})

const onBackToList = () => {
  router.push('/users')
}
</script>

<style lang="scss" scoped>
.user-detail{
  width: 100%;
  height: 100%;
  max-width: 300px;
}
</style>
