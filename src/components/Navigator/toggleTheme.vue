<template>
    <span class="sidebar-menu-link">
        <i class="fa-regular fa-moon"></i>
        Nigt mode                   
    </span>
    <InputSwitch 
        v-model="themeToggle"
        @change="toggleTheme"
        id="checkbox"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();

const themeToggle = ref<boolean>(false);

onMounted(() => {
  themeToggle.value = userStore.getTheme;
})

function toggleTheme() {
  const activeTheme = localStorage.getItem("user-theme");
  if (activeTheme === "lara-light-purple") {
    localStorage.setItem("user-theme", "lara-dark-purple");
    userStore.setToggleTheme(true);
  } else {
    localStorage.setItem("user-theme", "lara-light-purple");
    userStore.setToggleTheme(false);
  }
}
</script>

<style scoped>
@import '../../assets/stylesheets/components/navigator/toggleTheme.scss'
</style>
