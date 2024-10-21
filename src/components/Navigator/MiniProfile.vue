<script setup lang="ts">
import { ref, type Ref, watchEffect, onMounted, onUnmounted, computed } from "vue";
import { useUserStore } from '../../stores/userStore';

import ToggleTheme from './toggleTheme.vue';

const userStore = useUserStore();
const user = computed(() => userStore.getUser);

const toggledProfile: Ref<Boolean> = ref(false);
const sidebarMenuContainer: Ref<HTMLElement | null> = ref(null);

watchEffect(() => {
  toggledProfile.value = window.innerWidth < 600;
});

window.addEventListener('resize', () => {
  toggledProfile.value = window.innerWidth < 600;
});

onMounted(() => {
    // Add event listener when component is mounted
    document.addEventListener("mouseup", handleClickOutside);
});

onUnmounted(() => {
    // Remove event listener when component is unmounted
    document.removeEventListener("mouseup", handleClickOutside);
});

function handleClickOutside(event: MouseEvent) {
  if (window.innerWidth > 600 && sidebarMenuContainer.value && !sidebarMenuContainer.value.contains(event.target as Node)) {
    toggledProfile.value = false;
  }
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    userStore.setEmptyUser();
}
</script>

<template>
    <div class="sidebar-menu-container" ref="sidebarMenuContainer">

        <button v-if="!toggledProfile" @click="toggledProfile = !toggledProfile" class="sidebar-menu-closed">
            <p class="username">{{ user?.username }}</p>
            <img v-lazyload="user?.image">
        </button>

        <div v-else class="sidebar-menu-open">
            <div class="sidebar-menu-header">
                <img v-lazyload="user?.image">
                <div class="sidebar-menu-info">
                    <p class="name">{{ user?.username }}</p>
                    <p class="email">{{ user?.email }}</p>
                </div>             
            </div>

            <hr>

            <div class="sidebar-menu-items">
                <div class="sidebar-menu-item">
                    <router-link class="sidebar-menu-link" to="/my-account">
                        <i class="fa-regular fa-circle-user"></i>
                        My account
                    </router-link>
                </div>
                <div class="sidebar-menu-item night-mode">
                    <ToggleTheme />
                </div>
            </div>

            <hr>

            <div class="sidebar-menu-sign-out">
                <router-link @click="logout()" class="sidebar-menu-link" to="/">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    Sign out
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets/components/navigator/sidebarMenu.scss'
</style>