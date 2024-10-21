<script setup lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import { useSpinnerStore } from '../stores/spinnerStore';
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';

const spinnerStore = useSpinnerStore();
const route = useRoute();

const username = ref<string>('');
const password = ref<string>('');

onMounted(() => {
    window.scrollTo(0,0)
    spinnerStore.setSpinnerStatus(false);

    if (route.query.username !== null) {
        username.value = route.query.username as string;
    }
    if (route.query.password !== null) {
        password.value = route.query.password as string;
    }
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
                <p>{{ username }}</p>
            </div>
            <div class="credentials-row">
                <label>Password</label>
                <p>{{ password }}</p>
            </div>
        </div>
        <Button type="prime" to="/login">Sign in</Button>
    </div>

    <Footer />
</template>

<style lang="scss" scoped>
@import '../assets/stylesheets/views/registrationVerificationView.scss';
</style>