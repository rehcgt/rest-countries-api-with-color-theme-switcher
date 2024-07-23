<template>
  <div class="flex flex-row">
    <div class="flex flex-1">
      <div class="relative w-1/2">
        <ion-icon
          name="search"
          class="dark:text-white text-2xl cursor-pointer absolute top-[15px] left-4"
        ></ion-icon>
        <input
          type="text"
          placeholder="Search for a country..."
          class="w-full p-4 pl-12 rounded-lg dark:bg-dark-blue"
          @keyup="searchCountries"
        />
      </div>
    </div>
    <div class="">
      <select class="p-4 rounded-lg dark:bg-dark-blue" @change="filterByRegion">
        <option value="">Filter by Region</option>
        <option v-for="region in uniqueRegions" :key="region" :value="region">{{ region }}</option>
      </select>
    </div>
  </div>
  <div class="pt-8">
    <div class="grid xs:grid-cols-1 md:grid-cols-4 gap-4">
      <CountryCard
        v-for="country in countries"
        :key="country.cca3"
        :country="country"
        @countrySelected="handleCountrySelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CountryCard from '../components/CountryCard.vue'
import type { Country } from '../interfaces/Country'

const countries = ref<Country[]>([])
const allcountries = ref<Country[]>([])
const router = useRouter()

const uniqueRegions = computed(() => {
  const regions = allcountries.value.map((country) => country.region)
  return Array.from(new Set(regions)).filter((region) => region)
})

const handleCountrySelect = (country: Country) => {
  router.push({ name: 'CountryDetails', params: { cca3: country.cca3 } })
}

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all', {
      params: {
        fields: 'name,flags,cca3,region,capital,population'
      }
    })
    allcountries.value = response.data // Usa .value aquí
    countries.value = shuffleArray(allcountries.value).slice(0, 8) // Y aquí
  } catch (error) {
    console.error(error)
  }
}

const searchCountries = (event: any) => {
  const searchTerm = event.target.value.toLowerCase()
  countries.value = allcountries.value
    .filter((country: Country) => country.name.common.toLowerCase().includes(searchTerm))
    .slice(0, 8)
}

const filterByRegion = (event: any) => {
  const region = event.target.value
  if (region) {
    countries.value = allcountries.value
      .filter((country: Country) => country.region === region)
      .slice(0, 8)
  } else {
    countries.value = shuffleArray(allcountries.value).slice(0, 8)
  }
}

const shuffleArray = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

onMounted(() => {
  fetchCountries()
})
</script>
