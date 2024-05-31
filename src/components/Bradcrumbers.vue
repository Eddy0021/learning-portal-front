<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const $route = useRoute();
const $router = useRouter();

const breadcrumbList = ref($route.meta.breadcrumb || []);

const navigateTo = (route: string) => {
  if(breadcrumbList.value[route].link) $router.push(breadcrumbList.value[route].link);
};
</script>

<template>
    <div class="bradcrumbers">
        <div
        class="bradcrumbers-item" 
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
        >
            <span
            class="bradcrumbers-item-link"
            @click="navigateTo(index)"
            :class="{'linked': breadcrumbList.length-1 === index}">

                {{ breadcrumb.name }}

            </span>
            
            <i v-if="breadcrumbList.length-1 !== index" class="fa-solid fa-chevron-right"></i>
        </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets/components/bradcrumbers.scss'
</style>