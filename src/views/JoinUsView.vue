<script setup>
import Header from '../components/Header.vue';
import JoinUs from '../components/JoinUs.vue';
import Footer from '../components/Footer/Footer.vue';

import { onMounted } from "vue";

onMounted(() => {
  window.scrollTo(0,0)
})
</script>

<template>
    <Header />

    <div class="body">
        <h2>Join us</h2>
    
        <JoinUs type="Trainer" />

        <JoinUs type="Student" />
    </div>

    <Footer />
</template>

<style lang="scss" scoped>
.body{
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 5rem;
    margin-bottom: 5rem;

    h2{
        margin-top: 2rem;
        font-size: 56px;
        line-height: 78px;
        font-weight: 700;
        color: var(--black);
    }
}
</style>