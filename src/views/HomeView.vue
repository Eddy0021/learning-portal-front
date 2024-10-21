<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import DefaultHome from '../components/Home/defaultHome.vue'
import LoggedHome from '../components/Home/LoggedHome.vue'
import { computed } from "vue";
import { useUserStore } from '../stores/userStore';

const useStore = useUserStore();
const user = computed(() => useStore.getUser);

const isUserNotEmpty = computed(() => {
   return user.value !== null && Object.keys(user.value).length > 0;
});
</script>

<template>
   <Header />

   <DefaultHome v-if="!isUserNotEmpty" />

   <LoggedHome v-else />

   <Footer />
</template>

<style lang="scss" scoped>
</style>