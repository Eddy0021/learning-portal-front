<script setup>
import Logo from '../components/Logo.vue';
import LoginForm from '../components/LoginForm.vue';
import Footer from '../components/Footer/Footer.vue';
</script>

<template>
    <div class="top">
        <Logo />
    </div>
    
    <LoginForm />

    <Footer />
</template>

<style lang="scss" scoped>
.top{
    background: var(--background-white);
    border-color: #dee1e6;
    border-bottom: 1px solid var(--light-gray);
    border-radius: 30px;
    padding: 8px 15px;
}
</style>