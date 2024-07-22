<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="ml-4" @click="() => toggleDark()">
    <ion-icon :name="!isDark ? 'moon-outline' : 'sunny-outline'"></ion-icon>
    {{ !isDark ? 'Dark Mode' : 'Light Mode' }}
  </button>
</template>
