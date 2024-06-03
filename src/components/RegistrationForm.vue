<script setup lang="ts">
import { reactive } from "vue";
import Button from './Button.vue';
import trainer from '../assets/images/trainer.png';
import student from '../assets/images/student.png';
import { useRouter } from 'vue-router';
import { useSpinnerStore } from '../stores/spinnerStore';
import { User } from '../interface/Iuser';
// import { useUserStore } from '../stores/userStore';
import API_PATHS from "../constants/apiPaths";

const router = useRouter();
const spinnerStore = useSpinnerStore();
//const userStore = useUserStore();

const props = defineProps<{
    type: string
}>();

const user: User = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  image: "https://learning-platfrom-data.s3.eu-north-1.amazonaws.com/images/bg.jpg", // default image
  specialization: '', // Only for Trainer
  dateOfBirth: '', // Only for Student
  address: '', // Only for Student
  status: true,
  type: props.type,
});

async function register(){
    spinnerStore.setSpinnerStatus(true);
    
    let url = API_PATHS.users;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user)
        });

        if(response.ok){
            const data = await response.json();

            /*
                if we want to go my account,
                after registration we will get authentication error, since we have not token.

                that's why we aren't saving the data.
                we'll forward the user towards the login page.
            */

            //user.username = data.username;
            //localStorage.setItem('uid', data.user_id);
            //userStore.setUser(user);

            router.push({ name: 'Registration verification', query: { username: data.username, password: data.password } })
        }
    } catch (error: any) {
        console.error(error.message);
    }
}
</script>

<template>
    <div class="container">
        <slot></slot>
        <h1>Registration</h1>
        <h5 id="form-title">{{ props.type }}</h5>
        
        <form @submit.prevent="register">
            <div class="form-image">
                <img v-lazyload="props.type === 'Trainer' ? trainer : student">
            </div>

            <div class="form-content">

               <div class="textbox">
                    <div class="input">
                        <label>First name</label>
                        <input v-model="user.firstName" type="text" placeholder="Enter first name" required>
                    </div>

                    <div class="input">
                        <label>Last name</label>
                        <input v-model="user.lastName" type="text" placeholder="Enter last name" required>
                    </div>

                    <div class="input">
                        <label>Email</label>
                        <input v-model="user.email" type="text" placeholder="Enter email" required>
                    </div>

                    <div v-if="props.type === 'Trainer'" class="input">
                        <label>Specialization</label>
                        <select v-model="user.specialization" required>
                            <option value="" default hidden>Please select</option>
                            <option>HTML</option>
                            <option>CSS</option>
                            <option>Javascript</option>
                        </select>
                    </div>

                    <div v-if="props.type === 'Student'" class="input">
                        <label>Date of birth (optional)</label>
                        <input v-model="user.dateOfBirth" type="text" placeholder="Enter date of birth">
                    </div>

                    <div v-if="props.type === 'Student'" class="input">
                        <label>Address (optional)</label>
                        <input v-model="user.address" type="text" placeholder="Enter address">
                    </div>
               </div>

               <Button type="prime">Submit</Button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets/components/registrationForm.scss'
</style>