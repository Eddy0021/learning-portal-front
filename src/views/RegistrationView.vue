<script setup lang="ts">
import Header from '../components/Header.vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import Footer from '../components/Footer/Footer.vue';
import Spinner from '../components/Spinner.vue';
import { useSpinnerStore } from '../stores/spinnerStore';
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const type = computed(() => route.path.split('/')[2]);

const spinnerStore = useSpinnerStore();

const toggleSpinner = computed(() => spinnerStore.getSpinnerStatus);

onMounted(() => {
  window.scrollTo(0,0);
})
</script>

<template>
    <Header />

    <div class="body">
        <RegistrationForm :type="type" />
    </div>

    <Footer v-if="!toggleSpinner" />
    <Spinner v-if="toggleSpinner" />
</template>

<style lang="scss" scoped>
.body{
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 5rem;
    margin-top: 5rem;
    margin-bottom: 20rem;
}
</style>