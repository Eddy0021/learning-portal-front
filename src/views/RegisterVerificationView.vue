<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import { useSpinnerStore } from '../stores/spinnerStore';
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const spinnerStore = useSpinnerStore();

onMounted(() => {
  window.scrollTo(0,0)
  spinnerStore.setSpinnerStatus(false);
})
</script>

<template>
    <Header />

    <div class="body">
        <h1>Registration</h1>
        <i class="fa-solid fa-circle-check" style="color: #36B584FF;font-size:4rem"></i>
        <p class="info">
            Congratulations, you have successfully registered with Learn Platform! Here is your credentials that you can change in your account
        </p>
        <div class="credentials">
            <div class="credentials-row">
                <label>User name</label>
                <p>Marta_st</p>
            </div>
            <div class="credentials-row">
                <label>Password</label>
                <p>qwerty12345</p>
            </div>
        </div>
        <Button type="prime" to="/my-account">My account</Button>
    </div>

    <Footer />
</template>

<style lang="scss" scoped>
@import '../assets/stylesheets/views/registrationVerificationView.scss';
</style>