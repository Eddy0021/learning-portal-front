<script setup lang="ts">
import Button from '../Button.vue';

import homeImage from '../../assets/images/home-image.jpg'
import purpleOval from '../../assets/images/purple-oval.png'
import yellowOval from '../../assets/images/yellow-oval.png'
import purpleDots from '../../assets/images/purple-dots.png'
</script>

<template>
    <div class="container">
      <h1>Let's start learning</h1>
      <h3> 
         Welcome to Learn Platform - 
         where every day is a day to learn.
         Dive into the vast ocean of knowledge and empower yourself with the tools for a successful tomorrow. 
         Happy learning!
      </h3>

      <img class="home-image" v-lazyload="homeImage" />

      <div class="home-joinus">
         <img class="purple-oval" :src="purpleOval" />
         <img class="yellow-oval" :src="yellowOval" />
         <img class="purple-dots-top" :src="purpleDots" />
         <img class="purple-dots-bottom" :src="purpleDots" />
         <div class="home-joinus-text">
            <h2>Join us</h2>
            <p>
               Qui ut exercitation officia proident enim non tempor tempor ipsum ex nulla ea adipisicing sit consequat enim elit cupidatat o
            </p>
            <Button type="prime" to="/join-us">Join us</Button>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets/components/home/defaultHome.scss'
</style>