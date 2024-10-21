<script setup>
import { computed, ref } from 'vue';

import { useRouter } from "vue-router";

const $router = useRouter();

const props = defineProps({
  type: {
    type: String,
    default: 'prime',
    validator: (value) => ['prime', 'prime-text','secondary', 'important'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  to:{
    type: String,
    default: '',
  }
});

const isPressed = ref(false);

const buttonClasses = computed(() => [
  'button',
  props.type,
  {
    'button-pressed': !props.disabled && isPressed.value,
    'button-disabled': props.disabled,
  },
]);

function Action(){
  if(props.to) $router.push(props.to)
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @mousedown="isPressed = true"
    @mouseup="isPressed = false"
    @mouseleave="isPressed = false"
    @click="Action()"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@import '../assets/stylesheets/components/button.scss'
</style>