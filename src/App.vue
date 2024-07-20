<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
const theme = ref('light')
const toggleTheme = () => {
  console.log(theme)
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <header
    class="fixed top-0 w-full bg-white h-15 shadow-md px-4 py-2 flex items-center justify-between"
  >
    <div class="wrapper">
      <h1 class="text-2xl font-bold">Where in the world?</h1>
    </div>
    <nav>
      <button class="ml-4" @click="toggleTheme">
        <ion-icon :name="theme === 'light' ? 'moon-outline' : 'sunny-outline'"></ion-icon>
        {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
      </button>
    </nav>
  </header>
  <div class="w-full h-14"></div>

  <div class="mx-auto container">
    <RouterView />
  </div>
</template>
