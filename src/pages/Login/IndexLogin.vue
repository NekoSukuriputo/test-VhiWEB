<template>
  <q-page class="row items-center justify-evenly">
    <q-card
      class="my-card"
    >
      <q-card-section>
        <div class="row">
          <div
            class="col-lg-5 col-md-5"
            style="height: 100;"
          >
            <LoginIllustration />
          </div>
          <div class="col-lg-7 q-px-md col-md-7 col-sm-12">
            <h4 class="text-weight-bolder">
              Login
            </h4>
            <div>
              <q-form
                class="q-gutter-md"
                @submit="onSubmit"
                @reset="onReset"
              >
                <q-input
                  v-model="formData.email"
                  label="Email *"
                  outlined
                  type="email"
                  :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Invalid email format']"
                />

                <q-input
                  v-model="formData.password"
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  label="Password *"
                  :rules="[ val => val.length >= 5 || 'Please use minimum 5 characters']"
                >
                  <template #append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <div>
                  <q-btn
                    label="Submit"
                    type="submit"
                    color="primary"
                    :loading="isLoading"
                  />
                  <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                    :disable="isLoading"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import LoginIllustration from 'src/components/LoginIllustration.vue'

import {
  ComputedRef,
  ref,
  computed
} from 'vue'
import { useRouter } from 'vue-router'
import { AuthRequest } from 'src/types/entities/Auth'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()

const isLoading = ref<boolean>(false)
const isPwd = ref<boolean>(true)

const authStore = useAuthStore()
const formData: ComputedRef<AuthRequest> = computed(() => {
  return authStore.requestLogin
})

const onSubmit = async () => {
  try {
    isLoading.value = true
    await authStore.login()
    isLoading.value = false
    router.push('/users')
  } catch (error) {
    isLoading.value = false
  }
}

const onReset = () => {
  authStore.resetRequestLogin()
}

</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 1000px;
}
</style>
