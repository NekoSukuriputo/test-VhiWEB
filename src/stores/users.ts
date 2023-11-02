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

export const useUsersStore = defineStore('users', {
  state: () => ({
    detailUser: {
      ...INIT_USER
    } as User,
    listUsers: {
      ...INIT_LIST_USERS
    } as ListUsers,
    pagination: {
      currentPage: 1,
      totalPage: 2
    }
  }),

  getters: {
    getUser (state) {
      return state.detailUser
    },
    getListUsers (state) {
      return state.listUsers
    },
    getPagination (state) {
      return state.pagination
    }
  },

  actions: {
    async setPagination (page: number) {
      this.pagination.currentPage = page
      await this.fetchListUsers()
    },
    async fetchListUsers () {
      try {
        const params = {
          page: this.pagination.currentPage
        }
        const res: AxiosResponse<ListUsers> = await ApiService.get('/users', '', new URLSearchParams(params).toString())
        this.listUsers = res.data
        this.pagination.currentPage = res.data.page
        this.pagination.totalPage = res.data.total_pages
      } catch (error) {
        console.error(error)
      }
    },
    async fetchUser (id: string) {
      try {
        const res: AxiosResponse<User> = await (await ApiService.get(`/users/${id}`)).data
        this.detailUser = res.data
      } catch (error) {
        console.error(error)
      }
    },
    searchUser (keyword:string) {
      const keywordLower = keyword.toLowerCase()

      return this.listUsers.data.filter(obj => {
        return (
          obj.first_name.toLowerCase().includes(keywordLower) ||
          obj.last_name.toLowerCase().includes(keywordLower) ||
          obj.email.toLowerCase().includes(keywordLower)
        )
      })
    }
  }
})
