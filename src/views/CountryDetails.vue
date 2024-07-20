<template>
  <button @click="goBack" class="border border-gray-600 py-2 px-4 mb-6 rounded-lg mr-2">
    Back
  </button>
  <div class="flex justify-stretch h-[600px]">
    <div class="flex-1">
      <img
        class="max-w-full max-h-full"
        :src="country != null ? (country as any).flags.svg : ''"
        alt=""
      />
    </div>
    <div class="p-8 flex-1">
      <h1 class="font-bold text-2xl my-6">
        {{ country != null ? (country as any).name.common : '' }}
      </h1>
      <div class="grid grid-cols-2">
        <div>
          <strong>Official Name: </strong
          >{{ country != null ? (country as any).name.official : '' }}
        </div>
        <div>
          <strong>Top Level Domain: </strong>{{ country != null ? (country as any).tld[0] : '' }}
        </div>
        <div>
          <strong>Population: </strong
          >{{ country != null ? Number((country as any).population).toLocaleString() : '' }}
        </div>
        <div>
          <strong>Currencies: </strong>
          {{ country != null ? (Object.values((country as any).currencies) as any)[0].name : '' }}
        </div>
        <div><strong>Region: </strong>{{ country != null ? (country as any).region : '' }}</div>
        <div>
          <strong>Languages: </strong
          >{{ country != null ? Object.values((country as any).languages).join(', ') : '' }}
        </div>
        <div>
          <strong>Subregion: </strong>{{ country != null ? (country as any).subregion : '' }}
        </div>
        <div>
          <strong>Capital: </strong>{{ country != null ? (country as any).capital[0] : '' }}
        </div>
      </div>
      <div class="mt-6">
        <strong>Border Countries: </strong>
        <button
          v-for="border in country != null ? (country as any).borders : []"
          :key="border"
          class="border border-gray-600 p-2 rounded-lg mr-2"
          @click="handleBorderCountrySelect(border)"
        >
          {{ border }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const country = ref(null)
const route = useRoute()
const router = useRouter()

const fetchCountryData = async () => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${route.params.cca3}`)
    country.value = response.data[0]
  } catch (error) {
    console.error(error)
  }
}
const handleBorderCountrySelect = (cca3: string) => {
  router.push({ name: 'CountryDetails', params: { cca3: cca3 } })
}
const goBack = () => {
  router.push('/')
}
watch(
  () => route.params.cca3,
  () => {
    fetchCountryData()
  }
)
onMounted(fetchCountryData)
</script>
