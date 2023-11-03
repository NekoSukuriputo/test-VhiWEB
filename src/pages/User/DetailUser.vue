<template>
  <q-page class="row items-start justify-evenly q-pt-xl">
    <ItemUserLoading v-if="isLoading" />
    <ItemUser
      v-else
      :avatar="userData.avatar"
      :first_name="userData.first_name"
      :last_name="userData.last_name"
      :email="userData.email"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUsersStore } from 'src/stores/users'
import ItemUser from 'src/components/DetailUser/ItemUser.vue'
import ItemUserLoading from 'src/components/DetailUser/ItemUserLoading.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userStore = useUsersStore()

const userData = computed(() => {
  return userStore.getUser
})

const isLoading = computed(() => {
  return userStore.isLoading
})

onMounted(async () => {
  await userStore.fetchUser(String(route.params?.id))
})

</script>
