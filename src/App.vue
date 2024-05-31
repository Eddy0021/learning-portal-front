<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useUserStore } from './stores/userStore';
import { usePrimeVue } from 'primevue/config';

const PrimeVue = usePrimeVue();
const userStore = useUserStore();
const currentTheme = computed(() => userStore.getTheme);

onMounted(() => {
  const initUserTheme = getTheme();
  userStore.setToggleTheme(initUserTheme === 'lara-light-purple' ? false : true);
});

function getTheme() {
  return localStorage.getItem("user-theme");
};

watch(currentTheme, (newVal: boolean) => {
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
