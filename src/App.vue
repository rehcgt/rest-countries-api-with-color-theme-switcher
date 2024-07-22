<script setup lang="ts">
import { RouterView } from 'vue-router'
import DarkModeSwitch from './components/DarkModeSwitch.vue'
</script>

<template>
  <header
    class="fixed top-0 w-full bg-white h-15 shadow-md px-4 py-2 flex items-center justify-between text-slate-900 dark:bg-slate-950 dark:text-white"
  >
    <div class="wrapper">
      <h1 class="text-2xl font-bold">Where in the world?</h1>
    </div>
    <nav>
      <DarkModeSwitch />
    </nav>
  </header>
  <section class="bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100 h-screen">
    <div class="w-full h-14"></div>

    <div class="mx-auto container">
      <RouterView />
    </div>
  </section>
</template>
