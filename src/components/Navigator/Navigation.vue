<script setup lang="ts">
import AccountBox from "./AccountBox.vue";
import Button from '../Button.vue';
import { ref, type Ref, computed }  from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.getUser);

const route = useRoute();

const path = computed(() => route.path );

const isOpen: Ref<boolean> = ref(false);
const token = ref<string>(localStorage.getItem('token'));

const hideButton = ['/join-us', '/registration/Trainer', '/registration/Student', '/registration-verification', '/change-password']

function logout(){
    localStorage.removeItem('token');
    userStore.setEmptyUser();
}
</script>

<template>

    <button @click="isOpen = !isOpen" class="burger-button"><i class="fa-solid fa-ellipsis"></i></button>
    <div class="nav" :class="{ 'active': isOpen }">
        <div class="nav-buttons">
            <div class="nav-buttons-links">
                <router-link class="active" to="/blog">Blog</router-link>
                <router-link to="/pricing">Pricing</router-link>
                <router-link to="/about-us">About us</router-link>
                <router-link v-if="user" class="mobile-button" to="/my-account">My account</router-link>
            </div>
            <Button @click="logout()" v-if="user" type="prime-text" class="mobile-button" to="/">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                Sign out
            </Button>
        </div>

        <AccountBox v-if="!hideButton.includes(path)" />

        <span class="mobile-menu-close" @click="isOpen = !isOpen">
            <i class="fa-solid fa-x"></i>
        </span>
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets/components/navigator/navigation.scss'
</style>