<template>
  <panel title="Recently Viewed Cuisine">
    <v-data-table :headers="headers" :pagination.sync="pagination"
      :items="histories">
      <template slot="items" scope="props">
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
import CuisineHistoryService from '@/services/CuisineHistoryService'
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
      histories: []
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
      this.histories = (await CuisineHistoryService.index()).data
    }
  }
}
</script>

<style scoped>
</style>
