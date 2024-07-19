<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header
    class="fixed top-0 w-full bg-blue-500 shadow-md px-4 py-2 flex items-center justify-between"
  >
    <div class="wrapper">
      <h1 class="text-white text-2xl font-bold">Countries API</h1>
    </div>
    <nav>
      <RouterLink to="/" class="text-white">Home</RouterLink>
      <RouterLink to="/about" class="text-white mx-4">About</RouterLink>
    </nav>
  </header>
  <div class="w-full h-14"></div>

  <RouterView />
</template>
