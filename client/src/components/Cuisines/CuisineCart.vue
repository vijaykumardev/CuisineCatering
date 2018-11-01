<template>
  <panel title="Shopping Cart">
    <v-data-table :headers="headers" :pagination.sync="pagination"
      :items="carts">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          {{props.item.name}}
        </td>
        <td class="text-xs-right">
          {{props.item.cost}}
        </td>
      </template>
    </v-data-table>
  </panel>
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
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.carts = (await CartService.index()).data
    }
  }
}
</script>

<style scoped>
</style>
