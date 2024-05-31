<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import Bradcrumbers from '../components/Bradcrumbers.vue';
import PeopleTable from '../components/MyAccount/PeopleTable.vue';
import { Training } from '../interface/Itraining';

import { ref, computed, onMounted } from "vue";

const training = ref<Training>({});

onMounted(() => {
    window.scrollTo(0,0);
})

function addTraining(){
    console.log(training);  
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
                    <input v-model="training.name" placeholder="Enter course name" required />
                </div>
                <div class="input">
                    <label>Traning start date</label>
                    <Calendar v-model="training.startDate" showIcon iconDisplay="input" required />
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
                    <textarea v-model="training.description" placeholder="Enter item description">                     
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
                    <select v-model="training.trainer" required>
                        <option>Jhon Doe</option>
                        <option>Jerome Alero</option>
                        <option>J Crow</option>
                        <option>Anna Smith</option>
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