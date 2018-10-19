<template>
    <v-layout>
      <v-flex x6>
        <cuisine-cart />
        <recently-viewed-cuisines class="mt-2"/>
      </v-flex>
      <v-flex xs6 class="mt-2">
        <cuisine-search-panel />
        <cuisine-panel class="mt-2" />
      </v-flex>
    </v-layout>
</template>

<script>
import CuisinePanel from './CuisinePanel'
import CuisineCart from './CuisineCart'
import CuisineSearchPanel from './CuisineSearchPanel'
import RecentlyViewedCuisines from './RecentlyViewedCuisines'
import CuisineService from '@/services/CuisineService'
export default {
  components: {
    CuisinePanel,
    CuisineSearchPanel,
    CuisineCart,
    RecentlyViewedCuisines
  },
  data () {
    return {
      cuisines: null,
      cuisineImageUrl: "https://upload.wikipedia.org/wikipedia/commons/3/30/Lucknowi's_Famous_Dum_Biryani.jpg"
    }
  },
  async mounted () {
    // request to backend for all cusinines
    this.cuisines = (await CuisineService.index()).data
  }
}
</script>

<style scoped>
.cuisine {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.cuisine-name{
  font-size: 30px
}
.cuisine-cuisine_type{
  font-size: 18px
}
.cuisine-meal_type{
  font-size: 24px
}
.cuisine-cost{
  font-size: 30px
}
.cuisine-image {
  width: 70%;
  margin: 0 auto;
}
</style>
