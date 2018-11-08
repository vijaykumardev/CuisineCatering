<template>
  <v-layout>
    <v-flex xs8>
      <panel title="Shopping Cart">
        <v-data-table :headers="headers" :pagination.sync="pagination"
          :items="carts">
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">
              {{props.item.name}}
            </td>
            <td class="text-xs-right">
              {{props.item.Quantity}}
            </td>
            <td class="text-xs-right">
              {{props.item.cost*props.item.Quantity}}
            </td>
          </template>
        </v-data-table>
        <v-btn dark class="deep-orange" @click="putShoppingCart">
            Submit
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import CartService from '@/services/CartService'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Quantity',
          value: 'quantity'
        },
        {
          text: 'Cost',
          value: 'cost'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      carts: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'shoppingCart'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.carts = (await CartService.index()).data
      // await sCart.forEach((value, key, map) => {
      //   this.carts.push(value)
      // })
      // this.carts = (await CartService.index()).data
      // this.ccart = this.carts.length
    }
  },
  methods: {
    async putShoppingCart () {
      try {
        await CartService.put('ordered')
        this.$router.push({
          name: 'shopping-cart'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
