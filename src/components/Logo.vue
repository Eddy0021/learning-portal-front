<script setup lang="ts">
import logo from '../assets/images/logo.png'

</script>

<template>
    <div class="logo">
        <router-link class="link" to="/">
            <img :src="logo">
            <h2>learn</h2>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.logo{
    margin-right: 1rem;

    a{
        display: flex;
        align-items: center;
        text-decoration: none;
        
        img{
            width: 3rem;
        }

        h2{
            color: var(--black);
        }
    }
}
</style>