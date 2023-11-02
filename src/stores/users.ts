import { defineStore } from 'pinia'

import { User, Users, ListUsers } from 'src/types/entities/users/Index'

import ApiService from 'src/services/ApiService'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

const INIT_USER = {
  id: 1,
  email: '',
  first_name: '',
  last_name: '',
  avatar: ''
}

const INIT_LIST_USERS = {
  page: 1,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: []
}

export const useCounterStore = defineStore('users', {
  state: () => ({
    detailUser: {
      ...INIT_USER
    } as User,
    listUsers: {
      ...INIT_LIST_USERS
    } as ListUsers
  }),

  getters: {
    getUser (state) {
      return state.detailUser
    },
    getListUser (state) {
      return state.listUsers
    }
  },

  actions: {
    async getListUsers () {
      try {
        const params = {
          page: '1'
        }
        const res: AxiosResponse<ListUsers> = await ApiService.get('/users', new URLSearchParams(params).toString())
        this.listUsers = res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getUser (id: string) {
      try {
        const res: AxiosResponse<User> = await ApiService.get(`/users/${id}`)
        this.detailUser = res.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
