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
            {{cuisine.cost*this.selectedQty}}
          </div>
          <v-select :items="qty" v-model="selectedQty" label="Quantity">
          </v-select>
          <v-btn dark class="deep-orange"
            v-if="isUserLoggedIn && user.usertype==='CATERER'"
            :to="{name: 'cuisine-edit',params(){ return {cuisineId: cuisine.id}}}">
            Edit
          </v-btn>
          <v-btn dark class="deep-orange"
            v-if="isUserLoggedIn && !cart && user.usertype==='CUSTOMER'"
            @click="addToCart">
            Add to Cart
          </v-btn>
          <v-btn dark class="deep-orange"
            v-if="isUserLoggedIn && cart && user.usertype==='CUSTOMER'"
            @click="removeFromCart">
            Remove from Cart
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="cuisine-image" :src="cuisine.image"/>
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
import CuisineHistoryService from '@/services/CuisineHistoryService'

export default {
  data () {
    return {
      cuisine: null,
      cart: null,
      qty: [1, 2, 3, 4, 5, 6, 7, 8],
      selectedQty: 1
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  methods: {
    async addToCart () {
      try {
        this.cart = (await CartService.post({
          cuisineId: this.cuisine.id,
          userId: this.user.id,
          quantity: this.selectedQty
        })).data
        this.fetchFromCart()
      } catch (err) {
        console.log(err)
      }
    },
    async removeFromCart () {
      try {
        await CartService.delete(this.cart.id)
        this.cart = null
      } catch (err) {
        console.log(err)
      }
    },
    async fetchFromCart () {
      try {
        const carts = (await CartService.index({
          cuisineId: this.cuisine.id
        })).data
        if (carts.length) {
          this.cart = carts[0]
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    // async cart () {
    //   if (!this.isUserLoggedIn) {
    //     return
    //   }
    //
    //
    // }
  },
  async mounted () {
    try {
      const cuisineId = this.route.params.cuisineId
      this.cuisine = (await CuisineService.show(cuisineId)).data

      if (this.isUserLoggedIn) {
        CuisineHistoryService.post({
          cuisineId: cuisineId
        })
        this.fetchFromCart()
      }
    } catch (e) {
      console.log(e)
    }
    // await this.cart()
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
.qty {
  display: block;
  margin: 0 auto;
  font-size: 18px;
}
</style>
