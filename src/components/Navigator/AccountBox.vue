<script setup lang="ts">
import Button from "../Button.vue";
import MiniProfile from "./MiniProfile.vue";
import { computed } from "vue";
import { useUserStore } from '../../stores/userStore';

const useStore = useUserStore();
const user = computed(() => useStore.getUser);

const isUserNotEmpty = computed(() => {
   return user.value !== null && Object.keys(user.value).length > 0;
});
</script>

<template>
    <div v-if="!isUserNotEmpty" class="buttons">
        <Button type="prime-text" to="/login">Sign in</Button>
        <Button type="prime" to="/join-us">Join us</Button>
    </div>

    <MiniProfile v-else />
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets/components/navigator/accountBox.scss'
</style>