<template>
  <div>
    <panel title="Cuisine Metadata">
      <v-text-field
        label="Name"
        required
        :rules="[required]"
        v-model="cuisine.name"
        ></v-text-field>
      <v-text-field
        label="Cuisine Type"
        v-model="cuisine.cuisine_type"
        required
        :rules="[required]"
        ></v-text-field>
      <v-text-field
        label="Meal Type"
        v-model="cuisine.meal_type"
        required
        :rules="[required]"
        ></v-text-field>
      <v-text-field
        label="Cost"
        v-model="cuisine.cost"
        required
        :rules="[required]"
        ></v-text-field>
    </panel>
    <div class="danger-alert" v-if="error"> {{error}} </div>
    <v-btn
      dark
      class="deep-orange"
      @click="create">
      Create cuisine
    </v-btn>
  </div>
</template>

<script>
import CuisineService from '@/services/CuisineService'

export default {
  data () {
    return {
      cuisine: {
        name: null,
        cuisine_type: null,
        meal_type: null,
        cost: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      const areAllFieldsFilledIn = Object
        .keys(this.cuisine)
        .every(key => !!this.cuisine[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await CuisineService.post(this.cuisine)
        this.$router.push({
          name: 'cuisines'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
