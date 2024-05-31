<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import Bradcrumbers from '../components/Bradcrumbers.vue';
import StudentTraning from '../components/Training/StudentTraining.vue'
import TrainerTraining from '../components/Training/TrainerTraining.vue'
import { useUserStore } from '../stores/userStore';

import { ref, computed, onMounted } from "vue";

const userStore = useUserStore();
const user = computed(() => userStore.getUser);

onMounted(() => {
    window.scrollTo(0,0);
})
</script>

<template>
    <Header />

    <Bradcrumbers />

    <h2 class="title-h2">Trainings</h2>
    
    <StudentTraning v-if="user.type === 'Student'" />

    <TrainerTraining v-else />

   <Footer />
</template>

<style lang="scss" scoped>
</style>