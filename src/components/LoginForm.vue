<script setup lang="ts">
import Button from "./Button.vue";
import Spinner from "./Spinner.vue";
import { ref, type Ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '../stores/userStore';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const userStore = useUserStore();

const router = useRouter();

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const isVisible: Ref<boolean> = ref(false);
const focusUsername: Ref<boolean> = ref(false);
const focusPassword: Ref<boolean> = ref(false);

const tokenkey = ref<string>("");

const toggleSpinner: Ref<boolean> = ref(false);

import profilePicture from '../assets/images/noIMG.png';

function login(){
    if(tokenkey.value === ""){
        toast.add({ severity: 'error', summary: 'Recaptcha', detail: 'Please mark that you aren`t a robot.', life: 5000 });
        return;
    }
    
    toggleSpinner.value = true;
    /* api for login put token response into localstorage or warn user */
    localStorage.setItem('token', "123");
    userStore.setUser({
        firstName: "Marta",
        lastName: "Black",
        username: "Marta_st",
        email: "marta_12334@gmail.com",
        specialization: "Java",
        dateOfBirth: "01.01.2001",
        address: "Address;123 Main StreetBoston, MA 02108United States",
        image: profilePicture,
        status: true,
        type: "Student",
    })
    toggleSpinner.value = false;
    router.push('/my-account');
}

onMounted(() => {
    const inputElement = document.querySelectorAll('.p-inputtext');
    if (inputElement) {
        inputElement.forEach(element => {
            element.style.background = '#F3F4F6FF';
            element.style.border = 'none';
            element.style.width = '100%';
            element.style.boxShadow = "unset";
            element.classList.add('font-color');
            element.setAttribute('autocomplete', 'current-password');
            element.addEventListener('focus', () => {
                focusPassword.value = true;
                element.style.background = 'unset';
            });
            element.addEventListener('blur', () => {
                if(password.value === '')focusPassword.value = false;            
            });
        });
    }

    window.onloadCallback = () => {
       grecaptcha.enterprise.render("recaptcha_container", {
        sitekey: "6LdB8eopAAAAAH0o7adDHwOuN9_S8u8TdN_84keJ",
        action: "verify",
        callback: (token) => {
          window.recaptcha_token = token;
          console.log("recaptcha token : ", token);
          tokenkey.value = token;
        },
      });
    };

    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://www.google.com/recaptcha/enterprise.js?onload=onloadCallback"
    );
    recaptchaScript.setAttribute("async", "true");
    recaptchaScript.setAttribute("defer", "true");
    document.head.appendChild(recaptchaScript);
})
</script>

<template>
    <Toast />
    <div class="login-form">
        <form @submit.prevent="login">
            <h3>Sign In</h3>
            <h4>Welcome back</h4>

            <div class="textbox">
                <label>User name</label>
                <div class="input" :class="{ focused: focusUsername }">
                    <i class="fa-regular fa-user"></i>
                    <input v-model="username" @focus="focusUsername = true" @blur="username === '' ? focusUsername = false : focusUsername = true" type="text" placeholder="Enter username" autocomplete="username" required>
                </div>
            </div>
            <div class="textbox">
                <label>Password</label>
                <div class="input" :class="{ focused: focusPassword }">
                    <i class="fa-solid fa-lock"></i>
                    <Password v-model="password" toggleMask :feedback="false" placeholder="Enter password" required />
                </div>
            </div>

            <div id="recaptcha_container"></div>

            <Button type="prime" severity="warning">Sign In</Button> 
            <p class="sign-option">OR</p>
            <p class="sign-up-text">
                Don't have an account? 
                <router-link class="sign-up" to="/join-us">Sign up</router-link>
            </p>
        </form>
        <Spinner v-if="toggleSpinner" />
    </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets/components/loginForm.scss'
</style>