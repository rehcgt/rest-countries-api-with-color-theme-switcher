<template>
  <div class="p-8">
    <div class="grid grid-cols-4 gap-4">
      <CountryCard
        v-for="country in countries"
        :key="country.name.common"
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
  router.push({ name: 'CountryDetail', params: { countryName: country.name.common } })
}

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all', {
      params: {
        fields: 'name,flags'
      }
    })
    countries.value = shuffleArray(response.data).slice(0, 8)
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
