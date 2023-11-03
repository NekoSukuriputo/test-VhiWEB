<template>
  <q-page class="row items-start justify-evenly q-pt-xl">
    <q-card
      class="user-container q-ma-md"
    >
      <q-card-section>
        <span class="text-weight-bolder text-h6 q-pb-md">
          User List
        </span>
        <div v-if="isLoading">
          <div class="row items-center justify-center">
            <div
              v-for="item in 6"
              :key="item"
              class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-py-md"
            >
              <UserListItemLoading />
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="dataUsers.length > 0">
            <div class="row items-center justify-center">
              <div
                v-for="item in dataUsers"
                :key="item.id"
                class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-py-md"
              >
                <UserListItem
                  :id="item.id"
                  :avatar="item.avatar"
                  :first_name="item.first_name"
                  :last_name="item.last_name"
                  @handle-on-detail="onGoToDetail"
                />
              </div>
            </div>
          </div>
          <div v-else>
            NO USERS
          </div>
        </div>
        <div class="row items-center justify-evenly q-pa-md">
          <q-pagination
            v-model="currentPage"
            :max="totalPage"
            direction-links
            flat
            color="grey"
            active-color="primary"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUsersStore } from 'src/stores/users'

import UserListItem from 'src/components/UserItem/UserListItem.vue'
import UserListItemLoading from 'src/components/UserItem/UserListItemLoading.vue'
import { useRouter } from 'vue-router'

const userStore = useUsersStore()

const router = useRouter()

onMounted(async () => {
  await userStore.fetchListUsers()
})

const dataUsers = computed(() => {
  return userStore.getListUsers.data
})

const isLoading = computed(() => {
  return userStore.isLoading
})

const totalPage = computed(() => { return userStore.getPagination.totalPage })

const currentPage = computed({
  get () {
    return userStore.getPagination.currentPage
  },
  set (newValue) {
    userStore.setPagination(newValue)
  }
})

const onGoToDetail = async (id) => {
  router.push(`/users/${id}`)
}

</script>

<style lang="scss" scoped>
.user-container{
  width: 100%;
  max-width: 1000px;
}
</style>
