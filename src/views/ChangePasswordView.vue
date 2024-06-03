<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import { newPassword } from '../interface/InewPassword';
import { ref, onMounted } from "vue";
import { useUserStore } from '../stores/userStore';
import API_PATHS from '../constants/apiPaths';
import Swal from 'sweetalert2';
import axios from 'axios';

const userStore = useUserStore();

const changePassword = ref<newPassword>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
});
const showSuccess = ref<boolean>(false);

if(localStorage.getItem('token') === null) showSuccess.value = true;

onMounted(() => {
    const inputElement = document.querySelectorAll('.p-inputtext');
    if (inputElement) {
        inputElement.forEach(element => {
            const inputElement = element as HTMLElement;
            inputElement.style.background = '#F3F4F6FF';
            inputElement.style.border = 'none';
            inputElement.style.width = '100%';
            inputElement.ariaAutoComplete = "current-password";
            inputElement.classList.add('font-color');
        });
    }
})

function swal(message: string){
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

async function handleChange(){
    let id = localStorage.getItem('uid');

    const body = {
        user_id: id,
        currentPassword: changePassword.value.oldPassword,
        newPassword: changePassword.value.newPassword,
        confirmNewPassword: changePassword.value.confirmNewPassword
    };
    
    try {
        var token = localStorage.getItem('token');
        await axios({
            method: "PATCH",
            headers: {
                'Authorization': `${token}`
            },
            url: API_PATHS.users + "/update-password",
            data: body
        })
        .then((response: any) => {
            if (response.data === "Wrong current password." || response.data === "New password doesn't match.") swal(response.data);
            else{
                localStorage.removeItem('token');
                userStore.setEmptyUser();
                showSuccess.value = true;
            }
        })  
    } catch (error: any) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: error.message || 'An error occurred', // Display error message or a default message
            showConfirmButton: false,
            timer: 1500
        });
    }
}
</script>

<template>
    <Header />
    
    <div v-if="!showSuccess" class="title">
        <h2 class="tilte-h2">Security</h2>
    </div>

    <div v-if="!showSuccess" class="container">
        <div class="container-left">
            <i class="fa-solid fa-lock"></i>
            <label>Change Password</label>
        </div>
        <form class="container-right" @submit.prevent="handleChange">
            <div class="input">
                <label>Current password</label>
                <Password v-model="changePassword.oldPassword" toggleMask :feedback="false" required />
            </div>
            <div class="input">
                <label>New password</label>
                <Password v-model="changePassword.newPassword" toggleMask :feedback="false" required />
            </div>
            <div class="input">
                <label>Confirm new password</label>
                <Password v-model="changePassword.confirmNewPassword" toggleMask :feedback="false" required />
            </div>
            <div class="buttons">
                <Button type="prime-text" class="cancel" to="/my-account">Cancel</Button>
                <Button type="prime">Change password</Button>
            </div>
        </form>
    </div>

    <div v-else class="container-update">
        <h2 class="tilte-h2">Password changed</h2>
        <i class="fa-solid fa-circle-check" style="color: #36B584FF;font-size:4rem"></i>
        <p>Please proceed sign in with new password</p>
        <Button type="prime" to="/login">Sign In</Button>
    </div>

    <Footer />
</template>

<style lang="scss" scoped>
@import '../assets/stylesheets/views/changePasswordView.scss';
</style>