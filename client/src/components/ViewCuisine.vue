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
          <v-btn dark class="deep-orange"
            :to="{name: 'cuisine-edit',params(){ return {cuisineId: cuisine.id}}}">
            Edit
          </v-btn>
          <v-btn dark class="deep-orange"
            v-if="isUserLoggedIn && !cart"
            @click="addToCart">
            Add to Cart
          </v-btn>
          <v-btn dark class="deep-orange"
            v-if="isUserLoggedIn && cart"
            @click="removeFromCart">
            Remove from Cart
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
import {mapState} from 'vuex'
import CuisineService from '@/services/CuisineService'
import CartService from '@/services/CartService'
export default {
  data () {
    return {
      cuisine: null,
      cuisineImageUrl: null,
      cart: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    async addToCart () {
      try {
        this.cart = (await CartService.post({
          cuisineId: this.cuisine.id,
          userId: this.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async removeFromCart () {
      try {
        await CartService.delete(this.cart.cartId)
        this.cart = null
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    async cart () {
      console.log('watch')
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const carts = (await CartService.index({
          cuisineId: this.cuisine.id,
          userId: this.user.id
        })).data
        if (carts.length) {
          this.cart = carts[0]
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted () {
    try {
      const cuisineId = this.$store.state.route.params.cuisineId
      this.cuisine = (await CuisineService.show(cuisineId)).data
    } catch (e) {
      console.log(e)
    }
    // await this.cart()
    console.log('mounted')
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
