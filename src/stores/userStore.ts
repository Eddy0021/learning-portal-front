// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { User } from '../interface/Iuser';
import profilePicture from '../assets/images/noIMG.png';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      firstName: "Marta",
      lastName: "Black",
      username: "Marta_st",
      email: "marta_12334@gmail.com",
      specialization: "Java",
      dateOfBirth: "01.01.2001",
      address: "Address;123 Main StreetBoston, MA 02108United States",
      status: true,
      image: profilePicture,
      type: "Student",
    } as User | null,
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
