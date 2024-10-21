<script setup>
import { ref } from 'vue'

const language = ref('English')
</script>

<template>
    <div class="languages">
        <select v-model="language">
            <option value="English" default >English</option>
            <option value="German" >German</option>
            <option value="French" >French</option>
            <option value="Russian" >Russian</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/stylesheets/components/footer/languages.scss'
</style>
