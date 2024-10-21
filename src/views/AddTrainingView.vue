<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import Bradcrumbers from '../components/Bradcrumbers.vue';
import { Training } from '../interface/Itraining';
import API_PATHS from '../constants/apiPaths';
import { useUserStore } from '../stores/userStore';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const userStore = useUserStore();
const user = userStore.getUser;

const $router = useRouter();

import { ref, computed, onMounted } from "vue";

const training = ref<Training>({
    studentName: "",
    trainingName: "",
    date: "",
    duration: "",
    type: "",
    trainerName: "",
    student_id: ""
});

const calendarDate = ref<Date | null>(null);
const trainers = computed(() => user?.connections?.map((connection: any) => connection.name));

onMounted(() => {
    window.scrollTo(0,0);
})

async function addTraining(){
    try {
        training.value.date = calendarDate?.value
            ? calendarDate.value.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
            : ''; 

        training.value.studentName =  `${user?.firstName} ${user?.lastName}` || '';
        training.value.student_id = localStorage.getItem('uid') || '';

        var token = localStorage.getItem('token');

        const response = await fetch(API_PATHS.trainings, {
            method: "POST",
            headers: {
                'Authorization': `${token}`
            },
            body: JSON.stringify(training.value)
        });

        if (!response.ok) throw new Error(`Error fetching user data: ${response.status}`);   
        else{
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Training has been saved.",
            showConfirmButton: false,
            timer: 1500
            });
        } 
        $router.push('/trainings');
    } catch (error: any) {
        console.error(error.message);
    }
}
</script>

<template>
    <Header />

    <Bradcrumbers />

    <h2 class="title-h2">Add passed training</h2>

    <div class="container">
        <div class="container-title">
            <h2 class="title-h2">Training</h2>
        </div>
        <form class="container-items" @submit.prevent="addTraining">
            <div class="container-items-left">
                <div class="input">
                    <label>Name</label>
                    <input v-model="training.trainingName" placeholder="Enter course name" required />
                </div>
                <div class="input">
                    <label>Traning start date</label>
                    <Calendar v-model="calendarDate" showIcon iconDisplay="input" required />
                </div>
                <div class="input">
                    <label>Duration</label>
                    <input v-model="training.duration" placeholder="Enter duration" required />
                </div>
                <div class="input">
                    <label>Type</label>
                    <select v-model="training.type" required>
                        <option>Webinar</option>
                        <option>Online</option>
                        <option>Intern</option>
                    </select>
                </div>
                <div class="input">
                    <label>Description</label>
                    <textarea placeholder="Enter item description">                     
                    </textarea>
                </div>
                <div class="buttons">
                    <Button type="prime-text cancel" to="/trainings">Cancel</Button>
                    <Button type="prime">Add</Button>
                </div>
            </div>
            <div class="container-items-right">
                <div class="input">
                   <label>Add trainer</label>
                    <select v-model="training.trainerName" required>
                        <option v-for="trainer in trainers" :key="trainer">{{ trainer }}</option>
                    </select> 
                </div>
            </div>
        </form>
    </div>
   
   <Footer />
</template>

<style lang="scss" scoped>
@import '../assets/stylesheets/views/addTraining.scss';
</style>