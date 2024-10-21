<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useUserStore } from './stores/userStore';
import { usePrimeVue } from 'primevue/config';

const PrimeVue = usePrimeVue();
const userStore = useUserStore();
const currentTheme = computed(() => userStore.getTheme);

onMounted(async () => {
  const initUserTheme = getTheme();
  userStore.setToggleTheme(initUserTheme === 'lara-light-purple' ? false : true);

  localStorage.removeItem('token');
  localStorage.removeItem('uid');
});

function getTheme() {
  return localStorage.getItem("user-theme") ? localStorage.getItem("user-theme") : 'lara-light-purple';
};

watch(currentTheme, (newVal: boolean | null) => {
  if (!newVal) {
    setTheme('lara-light-purple');
  } else {
    setTheme('lara-dark-purple');
  }
});

function setTheme(theme: any) {
  localStorage.setItem("user-theme", theme);
  document.documentElement.className = theme;
  var currentTheme = theme === 'lara-light-purple' ? 'lara-dark-purple' : 'lara-light-purple';
  var newTheme = theme;
  
  PrimeVue.changeTheme(currentTheme, newTheme, 'theme-link', () => {});
};
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
