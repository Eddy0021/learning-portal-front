<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import DefaultHome from '../components/Home/defaultHome.vue'
import LoggedHome from '../components/Home/LoggedHome.vue'
import { computed } from "vue";
import { useUserStore } from '../stores/userStore';

const useStore = useUserStore();
const user = computed(() => useStore.getUser);

</script>

<template>
   <Header />

   <DefaultHome v-if="!user" />

   <LoggedHome v-else />

   <Footer />
</template>

<style lang="scss" scoped>
</style>