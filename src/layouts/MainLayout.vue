<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-white">
        <q-toolbar-title>
          Technical Test  | User Data
        </q-toolbar-title>

        <q-input
          v-if="isUserMenu"
          v-model="search"
          dark
          dense
          standout
          class="q-ml-md search-bar"
          placeholder="Search User"
        >
          <template #append>
            <q-icon
              v-if="search === ''"
              name="search"
            />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
        <q-space />
        <q-btn
          color="primary"
          outline
          class="text-white"
          @click="onLogout"
        >
          Logout
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()

const search = ref<string>('')
const route = useRoute()
const router = useRouter()
const isUserMenu = computed(() => {
  return ['UserPage', 'UserDetailPage'].includes(String(route.name))
})

const onLogout = async () => {
  authStore.logout()
  router.push('/login')
}

</script>
<style lang="scss">
.search-bar{
  width: 40%;
}
</style>
