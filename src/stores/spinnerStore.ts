// src/stores/searchStore.ts
import { defineStore } from 'pinia';

export const useSpinnerStore = defineStore({
  id: 'spinner',
  state: () => ({
    isSpinning: false,
  }),
  getters: {
    getSpinnerStatus(): boolean {
      return this.isSpinning;
    },
  },
  actions: {
    setSpinnerStatus(status: boolean) {
      this.isSpinning = status;    
    },
  },
});