<script setup lang="ts">
import Button from "../Button.vue";
import MiniProfile from "./MiniProfile.vue";
import { computed } from "vue";
import { useUserStore } from '../../stores/userStore';

const useStore = useUserStore();
const user = computed(() => useStore.getUser);
</script>

<template>
    <div v-if="!user" class="buttons">
        <Button type="prime-text" to="/login">Sign in</Button>
        <Button type="prime" to="/join-us">Join us</Button>
    </div>

    <MiniProfile v-else />
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets/components/navigator/accountBox.scss'
</style>