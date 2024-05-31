<template>
    <div class="terms">
        <span>&copy; {{ new Date().getFullYear() }} Learn, Inc.</span>
        <ul>
            <li>
                <router-link to="/">Privacy</router-link>
            </li>
            <li>
                <router-link to="/">Terms</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/stylesheets/components/footer/terms.scss'
</style>
