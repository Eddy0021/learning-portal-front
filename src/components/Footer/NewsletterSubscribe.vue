<script setup>
import Button from '../Button.vue'
</script>

<template>
    <div class="newsletter">
        <h3>Subscribe to our newsletter</h3>
        <p>For product announcements and exclusive insights</p>

        <form class="newsletter-input">
            <div class="input" @click="$refs.emailInput.focus()">
                <i class="fa-regular fa-envelope"></i>
                <input ref="emailInput" type="text" placeholder="Input your email" required />
            </div>
            <Button type="prime">Submit</Button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/stylesheets/components/footer/newsletter.scss'
</style>
