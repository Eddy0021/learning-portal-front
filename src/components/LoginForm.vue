<script setup lang="ts">
import Button from "./Button.vue";
import Spinner from "./Spinner.vue";
import { ref, type Ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '../stores/userStore';
import Swal from 'sweetalert2';
import API_PATHS from "../constants/apiPaths";

const userStore = useUserStore();

const router = useRouter();

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const focusUsername: Ref<boolean> = ref(false);
const focusPassword: Ref<boolean> = ref(false);

declare const grecaptcha: any;
declare const window: any;

const tokenkey = ref<string>("");

const toggleSpinner: Ref<boolean> = ref(false);

async function login(){
    if(tokenkey.value === ""){
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Please mark that you aren`t a robot.",
            showConfirmButton: false,
            timer: 5000
        });
        return;
    }
    
    toggleSpinner.value = true;

    /* 
        login api => user_id & token
        call getUser details to fill the rest of the information needed
    */ 
   const body = {
        username: username.value,
        password: password.value
   }

   try {
        const response = await fetch(API_PATHS.authentication + "/login", {
            method: "POST",
            body: JSON.stringify(body)
        });

        if(response.ok){
            const data = await response.json();

            if(data === "Wrong username." || data === "Wrong password."){
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: data,
                    showConfirmButton: false,
                    timer: 5000
                });
                toggleSpinner.value = false;
            }

            var token = "Bearer " + data.token

            localStorage.setItem('token', token);

            const responseUser = await fetch(API_PATHS.users + "/" + data.user_id,
            {
                method: "GET",
                headers: {
                    'Authorization': `${token}`
                },
            })

            if(responseUser.ok){
                const userdata = await responseUser.json();
                localStorage.setItem('uid', userdata.user_id);
                userStore.setUser({
                    firstName: userdata.firstName,
                    lastName: userdata.lastName,
                    username: userdata.username,
                    email: userdata.email,
                    specialization: userdata.specialization,
                    dateOfBirth: userdata.dateOfBirth,
                    address: userdata.address,
                    image: userdata.image,
                    status: userdata.status,
                    type: userdata.type,
                    connections: userdata.connections
                })
                toggleSpinner.value = false;
                router.push('/');
            }else{
                localStorage.removeItem('token');
            }
        }
   } catch (error: any) {
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: error.message,
            showConfirmButton: false,
            timer: 5000
        });
   }  
}

onMounted(() => {
    const inputElement = document.querySelectorAll('.p-inputtext');
    if (inputElement) {
        inputElement.forEach(element => {
            const inputElement = element as HTMLElement;
            inputElement.style.background = '#F3F4F6FF';
            inputElement.style.border = 'none';
            inputElement.style.width = '100%';
            inputElement.style.boxShadow = "unset";
            element.classList.add('font-color');
            element.setAttribute('autocomplete', 'current-password');
            element.addEventListener('focus', () => {
                focusPassword.value = true;
                inputElement.style.background = 'unset';
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
        callback: (token: any) => {
          window.recaptcha_token = token;
          //console.log("recaptcha token : ", token);
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