<template>
  <q-page class="row items-start justify-evenly q-pt-xl">
    <q-card
      class="user-detail q-ma-md"
    >
      <q-card-section>
        <div class="row items-center justify-center q-py-md">
          <q-avatar
            rounded
            size="200px"
          >
            <img :src="userData.avatar">
          </q-avatar>
        </div>
        <div class="q-py-md">
          <div class="text-h6">
            {{ userData.first_name }} {{ userData.last_name }}
          </div>
          <div class="text-subtitle2">
            {{ userData.email }}
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
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUsersStore } from 'src/stores/users'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userStore = useUsersStore()

const userData = computed(() => {
  return userStore.getUser
})

onMounted(async () => {
  await userStore.fetchUser(String(route.params?.id))
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
