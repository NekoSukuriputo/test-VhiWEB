import { defineStore } from 'pinia'
import { AuthRequest, AuthResponse } from 'src/types/entities/Auth'

import ApiService from 'src/services/ApiService'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Notify } from 'quasar'

const INIT_LOGIN = {
  email: '',
  password: ''
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    requestLogin: {
      ...INIT_LOGIN
    } as AuthRequest
  }),

  getters: {
    getToken (state) {
      return state.token
    }
  },

  actions: {
    setLoginRequest (data: AuthRequest) {
      this.requestLogin = data
    },
    resetRequestLogin () {
      this.requestLogin = {
        ...INIT_LOGIN
      }
    },
    async login () {
      try {
        const res: AxiosResponse<AuthResponse> = await ApiService.post('/login', this.requestLogin as AxiosRequestConfig)
        localStorage.setItem('token', res.data.token)
      } catch (error) {
        console.error(error)
        Notify.create({
          type: 'negative',
          message: error.response.data.error,
          position: 'top'
        })
      }
    },
    logout () {
      localStorage.removeItem('token')
    }
  }
})
