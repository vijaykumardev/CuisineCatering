<template>
  <panel title="Cuisines">
      <v-btn slot="action" v-if="isUserLoggedIn && user.usertype==='CATERER'" :to="{name: 'cuisine-create'}" class="deep-orange accent-2" light medium absolute right middle fab>
        <v-icon>add</v-icon>
      </v-btn>
    <div v-for="cuisine in cuisines" class="cuisine" :key="cuisine.id">
      <v-layout>
        <v-flex xs6>
          <div class="cuisine-name">
            {{cuisine.name}}
          </div>
          <div class="cuisine-meal_type">
            {{cuisine.meal_type}}
          </div>
          <div class="cuisine-cuisine_type">
            {{cuisine.cuisine_type}}
          </div>
          <div class="cuisine-cost">
            {{cuisine.cost}}
          </div>
          <v-btn dark class="deep-orange" :to="{name: 'cuisine', params: {cuisineId: cuisine.id}}">
            View
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="cuisine-image" :src="cuisine.image"/>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import CuisineService from '@/services/CuisineService'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      cuisines: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.cuisines = (await CuisineService.index(value)).data
      }
    }
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
