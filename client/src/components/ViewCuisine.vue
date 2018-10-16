<template>
  <v-layout>
    <panel title="Cuisine Metadata">
      <v-layout>
        <v-flex xs6 class="cuisine">
          <div class="cuisine-name">
            {{cuisine.name}}
          </div>
          <div class="cuisine-meal_type">
            {{cuisine.meal_type}}
          </div>
          <div class="cuisine-cuisine_type">
            {{cuisine.cusine_type}}
          </div>
          <div class="cuisine-cost">
            {{cuisine.cost}}
          </div>
          <v-btn dark class="deep-orange" @click="navigateTo({name: 'cuisine-edit',params: {cuisineId: cuisine.id}})">
            Edit
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="cuisine-image" :src="cuisineImageUrl"/>
          <br>
          {{cuisine.name}}
        </v-flex>
      </v-layout>
    </panel>
  </v-layout>
</template>

<script>
import CuisineService from '@/services/CuisineService'

export default {
  data () {
    return {
      cuisine: null,
      cuisineImageUrl: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    const cuisineId = this.$store.state.route.params.cuisineId
    this.cuisine = (await CuisineService.show(cuisineId)).data
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
