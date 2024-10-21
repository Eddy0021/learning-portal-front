<script setup lang="ts">
import imgTrainer from '../assets/images/JoinT.png';
import imgStudent from '../assets/images/JoinS.png';

import Button from './Button.vue';

defineProps<{
    type: string
}>();
</script>

<template>
    <div class="join-component">
        <div class="info">
            <h3>Register as {{ type }}</h3>
            <p>Do consectetur proident proident id eiusmod deserunt consequat pariatur ad ex velit do Lorem reprehenderit.</p>
            <Button type="prime" :to="'/registration/' + type">Join us</Button>
        </div>
        <img v-lazyload="type === 'Trainer' ? imgTrainer : imgStudent" alt="">
    </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets/components/joinUs.scss'
</style>