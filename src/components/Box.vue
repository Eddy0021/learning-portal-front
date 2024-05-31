<script setup lang="ts">
import imgTrainer from '../assets/images/JoinT.png';
import imgStudent from '../assets/images/JoinS.png';

// static box images
import c1 from '../assets/images/c1.png'
import c2 from '../assets/images/c2.png'
import c3 from '../assets/images/c3.png'

import Button from './Button.vue';

const props = defineProps<{
    img: string,
    tag: string
    title: string
    date: string
    readTime: string
}>();

function setImage(){
    if(props.img === "c1") return c1;
    if(props.img === "c2") return c2;
    if(props.img === "c3") return c3;
}
</script>

<template>
    <div class="box-component">      
        <img :src="setImage()" alt="">
        <div class="info">
            <h4>{{ tag }}</h4>
            <h3>{{ title }}</h3>
            <div class="split">
                <p>{{ date }}</p>
                <div class="time-to-read">{{ readTime }} mins read</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets/components/box.scss'
</style>