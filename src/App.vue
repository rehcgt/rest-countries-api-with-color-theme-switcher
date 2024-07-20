<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header
    class="fixed top-0 w-full bg-white h-15 shadow-md px-4 py-2 flex items-center justify-between"
  >
    <div class="wrapper">
      <h1 class="text-2xl font-bold">Where in the world?</h1>
    </div>
    <nav>
      <RouterLink to="/" class="">Home</RouterLink>
      <RouterLink to="/about" class="ml-4">About</RouterLink>
      <span class="ml-4"> <ion-icon name="moon-outline"></ion-icon> Dark Mode </span>
      <span class="ml-4"> <ion-icon name="sunny-outline"></ion-icon> Light Mode </span>
    </nav>
  </header>
  <div class="w-full h-14"></div>

  <div class="mx-auto container">
    <RouterView />
  </div>
</template>
