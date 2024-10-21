<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BreadcrumbList } from '../interface/Ibradcrumber';

const $route = useRoute();
const $router = useRouter();

const breadcrumbList = ref<BreadcrumbList>($route.meta.breadcrumb as BreadcrumbList);

const navigateTo = (route: string | number) => {
  if(breadcrumbList.value[route].link) $router.push(breadcrumbList.value[route].link);
};

const isLastBreadcrumb = computed(() => {
  return (index: any) => {
    return (breadcrumbList.value.length as any) - 1 === index;
  };
});
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
            :class="{'linked': isLastBreadcrumb(index)}">

                {{ breadcrumb.name }}

            </span>
            
            <i v-if="!isLastBreadcrumb(index)" class="fa-solid fa-chevron-right"></i>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/stylesheets/components/bradcrumbers.scss'
</style>