<script setup lang="ts">
import { reactive } from "vue";
import Button from './Button.vue';
import trainer from '../assets/images/trainer.png';
import student from '../assets/images/student.png';
import { useRouter } from 'vue-router';
import { useSpinnerStore } from '../stores/spinnerStore';
import { User } from '../interface/Iuser';

const router = useRouter();
const spinnerStore = useSpinnerStore();

const props = defineProps<{
    type: string
}>();

const user: User = reactive({
  firstName: '',
  lastName: '',
  email: '',
  specialization: '', // Only for Trainer
  dateOfBirth: '', // Only for Student
  address: '', // Only for Student
  type: props.type,
});

function register(){
    spinnerStore.setSpinnerStatus(true);
    /* Api to backend with register data if resolves go to registration/verifiy else throw error */
    router.push('/registration-verification')
    console.log('User:', user);
}
</script>

<template>
    <div class="container">
        <slot></slot>
        <h1>Registration</h1>
        <h5 id="form-title">{{ props.type }}</h5>
        
        <form @submit.prevent="register">
            <div class="form-image">
                <img :src="props.type === 'Trainer' ? trainer : student">
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