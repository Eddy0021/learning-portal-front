<script setup lang="ts">
import Box from '../Box.vue';
import { useUserStore } from '../../stores/userStore';
import { computed } from "vue";

const userStore = useUserStore();
const user = computed(() => userStore.getUser);
</script>

<template>
    <div class="container">
        <h1>Hi, {{user?.firstName}}!</h1>
        <h3> 
            Welcome to Learn Platform - 
            where every day is a day to learn.
            Dive into the vast ocean of knowledge and empower yourself with the tools for a successful tomorrow. 
            Happy learning!
        </h3>

        <div class="news">
            <h1>What's new?</h1>
            <h3> 
                Do consectetur proident proident id eiusmod deserunt consequat pariatur ad ex velit do Lorem reprehenderit.
            </h3>
            <div class="articles">
                <Box img="c1" tag="Do consectetur" title="Aliqua Irure Tempor Lorem Occaecat Volup" date="Dec 24, 2022" readTime="5" />
                <Box img="c2" tag="Consequat labore" title="Commodo Deserunt Ipsum Occaecat Qui" date="Dec 12, 2022" readTime="10" />
                <Box img="c3" tag="Laboris nulla" title="Deserunt Cccaecat Qui Amet Tempor Dolore" date="Nov 20, 2022" readTime="3" />
            </div>
        </div>               
   </div>
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets/components/home/loggedHome.scss'
</style>