<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import { newPassword } from '../interface/InewPassword';
import { ref, onMounted } from "vue";

const changePassword = ref<newPassword>({});
const showSuccess = ref<boolean>(false);

if(localStorage.getItem('token') === null) showSuccess.value = true;

onMounted(() => {
    const inputElement = document.querySelectorAll('.p-inputtext');
    if (inputElement) {
        inputElement.forEach(element => {
            element.style.background = '#F3F4F6FF';
            element.style.border = 'none';
            element.style.width = '100%';
            element.autocomplete = "current-password";
            element.classList.add('font-color');
        });
    }
})

function handleChange(){
    localStorage.removeItem('token');
    showSuccess.value = true;
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