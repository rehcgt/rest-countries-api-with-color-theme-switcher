<template>
  <div class="p-8">
    <h1>{{ country != null ? country.name.common : '' }}</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      country: null
    }
  },
  async mounted() {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${this.$route.params.countryName}`
      )
      this.country = response.data[0]
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
