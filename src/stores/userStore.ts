// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { User } from '../interface/Iuser';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {} as User | null,
    isEdit: false,
    isDarkTheme: null as boolean | null,
  }),
  getters: {
    getUser(): User | null {
      return this.user;
    },
    getUserEdit(): boolean{
      return this.isEdit;
    },
    getTheme(): boolean | null{
      return this.isDarkTheme;
    },
    getIsUserNotEmpty(): boolean {
      return this.user !== null && Object.keys(this.user).length > 0;
    }
  },
  actions: {
    setUser(user: User): void {
      this.user = user;
    },
    setEmptyUser(){
      this.user = null;
    },
    setUserEdit(status: boolean) {
      this.isEdit = status;
    },
    setToggleTheme(isDark: boolean){
      this.isDarkTheme = isDark;
    }
  },
});
