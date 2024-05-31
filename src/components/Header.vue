<script setup lang="ts">
import Logo from './Logo.vue';
import Navigation from './Navigator/Navigation.vue';
</script>

<template>
    <div class="header">
        <Logo />
        <Navigation />
    </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets/components/header.scss'
</style>