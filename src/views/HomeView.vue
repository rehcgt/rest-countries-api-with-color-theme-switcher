<template>
  <div class="flex flex-row">
    <div class="flex flex-1">
      <input
        type="text"
        placeholder="Search for a country..."
        class="w-1/2 border p-4 rounded-lg"
      />
    </div>
    <div class="">
      <select class="border p-4 rounded-lg">
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  </div>
  <div class="pt-8">
    <div class="grid grid-cols-4 gap-4">
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CountryCard from '../components/CountryCard.vue'

const countries = ref<any[]>([])
const router = useRouter()

const handleCountrySelect = (country: any) => {
  router.push({ name: 'CountryDetails', params: { cca3: country.cca3 } })
}

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all', {
      params: {
        fields: 'name,flags,cca3,region,capital,population'
      }
    })
    countries.value = shuffleArray(response.data).slice(0, 8)
    console.log(response)
    console.log(countries)
  } catch (error) {
    console.error(error)
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
