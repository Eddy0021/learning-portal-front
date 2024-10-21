<script setup lang="ts">
// static box images
import c1 from '../assets/images/c1.png'
import c2 from '../assets/images/c2.png'
import c3 from '../assets/images/c3.png'

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
        <img v-lazyload="setImage()" alt="">
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