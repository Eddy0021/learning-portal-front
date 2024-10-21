<script setup lang="ts">

</script>

<template>
    <div class="spinner">
        <i class="fa-solid fa-spinner fa-spin" style="color: #63E6BE;"></i>
        <p>Loading...</p>
    </div>
</template>

<style scoped lang="scss">
.spinner{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #FFFFFFEB;
    border-radius: 0px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
</style>