<template>
  <div @click="handleClick" class="cursor-pointer border p-4 rounded-lg flex flex-col items-center">
    <img :src="country.flags.svg" alt="" class="w-32 h-20 object-cover" />
    <p class="mt-2 text-center">{{ country.name.common }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  country: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['countrySelected'])

const handleClick = () => {
  emits('countrySelected', props.country)
}
</script>
