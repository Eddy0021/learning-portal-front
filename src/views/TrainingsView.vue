<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import Bradcrumbers from '../components/Bradcrumbers.vue';
import StudentTraning from '../components/Training/StudentTraining.vue'
import TrainerTraining from '../components/Training/TrainerTraining.vue'
import { useUserStore } from '../stores/userStore';
import API_PATHS from '../constants/apiPaths';

import { ref, computed, onMounted } from "vue";

const userStore = useUserStore();
const user = computed(() => userStore.getUser);
const tableData = ref([]);

onMounted(async () => {
    window.scrollTo(0,0);

    var token = localStorage.getItem('token');

    if(user.value.type === 'Student'){
        var id = localStorage.getItem('uid');
        const response = await fetch(API_PATHS.trainings + "/" + id, {
            method: "GET",
            headers: {
                'Authorization': `${token}`
            },
        });
        if (!response.ok) throw new Error(`Error fetching user data: ${response.status}`);
        
        tableData.value = await response.json();
    }else{
        const response = await fetch(API_PATHS.trainings, {
            method: "GET",
            headers: {
                'Authorization': `${token}`
            },
        });
        if (!response.ok) throw new Error(`Error fetching user data: ${response.status}`);
        
        tableData.value = await response.json();
    }
})
</script>

<template>
    <Toast />
    <Header />

    <Bradcrumbers />

    <h2 class="title-h2">Trainings</h2>
    
    <StudentTraning v-if="user.type === 'Student'" :data="tableData" />

    <TrainerTraining v-else :data="tableData" />

   <Footer />
</template>

<style lang="scss" scoped>
</style>