<template>
  <div
    @click="handleClick"
    class="cursor-pointer h-auto border p-0 rounded-lg flex flex-col items-center"
  >
    <img :src="country.flags.svg" alt="" class="w-full h-48 object-cover" />
    <div class="w-[90%] mx-auto mb-8">
      <p class="text-left w-full font-bold size-4 mt-6">{{ country.name.common }}</p>
      <p class="w-full text-left size-3 my-3">
        <strong>Population: </strong>{{ Number(country.population).toLocaleString() }}
      </p>
      <p class="text-left w-full size-3 mt-3"><strong>Region: </strong>{{ country.region }}</p>
      <p class="text-left w-full size-3 mt-3"><strong>Capital: </strong>{{ country.capital[0] }}</p>
    </div>
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
