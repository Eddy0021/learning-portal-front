<script setup>
import Logo from '../Logo.vue'
import FooterLinks from './FooterLinks.vue';
import NewsletterSubscribe from './NewsletterSubscribe.vue';
import Languages from './Languages.vue';
import Terms from './Terms.vue';
import Socials from './Socials.vue'
</script>

<template>
    <div class="footer">
        <div class="footer-items">
            <Logo />
            <FooterLinks />
            <NewsletterSubscribe />
            <hr />
            <Languages />
            <Terms />
            <Socials />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/stylesheets/components/footer/footer.scss'
</style>
