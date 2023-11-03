<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-white">
        <q-toolbar-title>
          Technical Test  | User Data
        </q-toolbar-title>

        <q-select
          v-if="isUserMenu"
          :model-value="search"
          standout="bg-primary text-white"
          dense
          class="q-ml-md search-bar"
          label="Search User"
          hide-bottom-space
          hide-dropdown-icon
          label-color="white"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          map-options
          emit-value
          @filter="filterFn"
          @update:model-value="goToDetail"
        >
          <template #option="scope">
            <q-item
              v-bind="scope.itemProps"
              style="max-height: 20px;"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="scope.opt.avatar">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.first_name }} {{ scope.opt.last_name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template #append>
            <q-icon
              v-if="search === ''"
              name="search"
              class="text-white"
            />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click.stop.prevent="search = ''"
            />
          </template>
        </q-select>
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
import { useUsersStore } from 'src/stores/users'

const authStore = useAuthStore()
const userStore = useUsersStore()

const search = ref<string>('')
const route = useRoute()
const router = useRouter()
const isUserMenu = computed(() => {
  return ['UserPage', 'UserDetailPage'].includes(String(route.name))
})

const options = ref([])
const onLogout = async () => {
  authStore.logout()
  router.push('/login')
}

const filterFn = (val, update, abort) => {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = userStore.searchUser(needle)
  })
}

const goToDetail = (val) => {
  search.value = `${val.first_name} ${val.last_name}`
  router.push(`/users/${val.id}`)
}

</script>
<style lang="scss">
.search-bar{
  width: 40%;
}
</style>
