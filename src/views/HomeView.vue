<template>
  <div class="flex flex-row">
    <div class="flex flex-1">
      <input
        type="text"
        placeholder="Search for a country..."
        class="w-1/2 border p-4 rounded-lg"
        @keyup="searchCountries"
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
interface Country {
  name: {
    common: string
  }
  flags: {
    svg: string
  }
  cca3: string
  region: string
  capital: string
  population: number
}

const countries = ref<Country[]>([])
let allcountries: Country[] = []
const router = useRouter()

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
    allcountries = response.data
    countries.value = shuffleArray(allcountries).slice(0, 8)
    console.log(response)
    console.log(countries)
  } catch (error) {
    console.error(error)
  }
}

const searchCountries = (event: any) => {
  const searchTerm = event.target.value.toLowerCase()
  console.log(searchTerm)
  countries.value = allcountries
    .filter((country: Country) => {
      return country.name.common.toLowerCase().includes(searchTerm)
    })
    .slice(0, 8)
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
