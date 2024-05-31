<template>
    <div class="footer-links">
        <div class="products">
            <h3>Products</h3>
            <router-link to="/features">Features</router-link>
            <router-link to="/pricing">Pricing</router-link>
        </div>
        <div class="resources">
            <h3>Resources</h3>
            <router-link to="/blog">Blog</router-link>
            <router-link to="/user-guides">User guides</router-link>
            <router-link to="/webinars">Webinars</router-link>
        </div>
        <div class="company">
            <h3>Company</h3>
            <router-link to="/about-us">About us</router-link>
            <router-link to="/contact-us">Contact us</router-link>
        </div>
        </div>
</template>

<style lang="scss" scoped>
@import '../../assets/stylesheets/components/footer/footerLinks.scss'
</style>
