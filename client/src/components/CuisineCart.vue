<template>
  <v-container grid-list-md text-xs-center>
    <v-layout
    v-if="isUserLoggedIn && user.usertype==='CUSTOMER'">
        <v-flex>
          <panel title="Shopping Cart">
            <v-data-table :headers="headers" :pagination.sync="pagination"
              :items="carts.filter(cart => cart.Status == null )">
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
            <v-btn dark class="deep-orange" @click="putShoppingCart('ordered')">
                Submit
            </v-btn>
          </panel>
        </v-flex>
        <v-flex>
          <panel title="Order Pending">
          <v-data-table :headers="headers" :pagination.sync="pagination"
            :items="carts.filter(cart => cart.Status === 'ordered' )">
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
          </panel>
          <panel title="Order History" class="mt-2">
          <v-data-table :headers="headers" :pagination.sync="pagination"
            :items="carts.filter(cart => cart.Status === 'complete' )">
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
          </panel>
        </v-flex>
      </v-layout>
      <v-layout
       v-if="isUserLoggedIn && user.usertype==='CATERER'">
        <v-flex xs12>
          <panel title="Open Cuisine Orders">
            <v-data-table :headers="headers" :pagination.sync="pagination"
              :items="carts.filter(cart => cart.Status === 'ordered' )">
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
            <v-btn dark class="deep-orange" @click="putShoppingCart('complete')">
                Order Deliver
            </v-btn>
          </panel>
        </v-flex>
        <v-flex xs12>
          <panel title="Previous Cuisine Orders">
            <v-data-table :headers="headers" :pagination.sync="pagination"
              :items="carts.filter(cart => cart.Status === 'complete' )">
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
          </panel>
        </v-flex>
    </v-layout>
  </v-container>
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
      this.carts = (await CartService.index({
        usertype: this.user.usertype
      })).data
    }
  },
  methods: {
    async putShoppingCart (status) {
      try {
        await CartService.put(status)
        this.$router.push({
          name: 'shopping-cart'
        })
        this.carts = (await CartService.index({
          usertype: this.user.usertype
        })).data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
