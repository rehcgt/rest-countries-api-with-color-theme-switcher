<template>
  <button
    @click="goBack"
    class="py-2 px-4 mb-6 mr-2 rounded shadow-xl shadow-gray-400 dark:bg-dark-blue dark:shadow-black"
  >
    <ion-icon name="arrow-back-outline" class="align-middle"></ion-icon>
    Back
  </button>
  <div class="grid xs:grid-cols-1 md:grid-cols-2 justify-stretch h-[600px]">
    <div>
      <img class="max-w-full max-h-full" :src="country?.flags?.svg || ''" alt="" />
    </div>
    <div class="p-8">
      <h1 class="font-bold text-2xl my-6">
        {{ country?.name?.common || '' }}
      </h1>
      <div class="grid md:grid-cols-2 xs:grid-cols-1">
        <div><strong>Official Name: </strong>{{ country?.name?.official || '' }}</div>
        <div>
          <strong>Top Level Domain: </strong>
          {{ Array.isArray(country?.tld) && country.tld.length > 0 ? country.tld[0] : '' }}
        </div>
        <div>
          <strong>Population: </strong>
          {{ Number(country?.population)?.toLocaleString() || '' }}
        </div>
        <div>
          <strong>Currencies: </strong>
          <span v-for="(currency, index) in Object.values(country?.currencies || {})" :key="index">
            {{ currency.name }} ({{ currency.symbol }})<span
              v-if="index < Object.values(country?.currencies || {}).length - 1"
              >,
            </span>
          </span>
        </div>
        <div><strong>Region: </strong>{{ country?.region || '' }}</div>
        <div>
          <strong>Languages: </strong>
          <span v-for="(language, index) in Object.values(country?.languages || {})" :key="index">
            {{ language
            }}<span v-if="index < Object.values(country?.languages || {}).length - 1">, </span>
          </span>
        </div>
        <div><strong>Subregion: </strong>{{ country?.subregion || '' }}</div>
        <div>
          <strong>Capital: </strong>
          {{
            Array.isArray(country?.capital) && country.capital.length > 0 ? country.capital[0] : ''
          }}
        </div>
      </div>
      <div class="mt-6">
        <strong>Border Countries: </strong>
        <button
          v-for="borderCountry in borderCountries"
          :key="borderCountry.cca3"
          class="py-2 px-4 mb-6 mx-1 rounded dark:bg-dark-blue shadow-xl shadow-gray-400 dark:shadow-black"
          @click="handleBorderCountrySelect(borderCountry.cca3)"
        >
          {{ borderCountry.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Country } from '../interfaces/Country'

const country = ref<Country>()
const route = useRoute()
const borderCountries = ref<{ name: string; cca3: string }[]>([])
const router = useRouter()

const fetchCountryData = async () => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${route.params.cca3}`)
    country.value = response.data[0]
    if (country.value?.borders) {
      const borders = await Promise.all(
        country.value.borders.map(async (border) => {
          const res = await axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
          return { name: res.data[0].name.common, cca3: border }
        })
      )
      borderCountries.value = borders
    }
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
