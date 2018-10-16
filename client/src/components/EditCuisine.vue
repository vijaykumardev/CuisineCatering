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
        v-model="cuisine.cusine_type"
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
      @click="save">
      Save cuisine
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
    async save () {
      const areAllFieldsFilledIn = Object
        .keys(this.cuisine)
        .every(key => !!this.cuisine[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      const cuisineId = this.$store.state.route.params.cuisineId
      try {
        await CuisineService.put(this.cuisine)
        this.$router.push({
          name: 'cuisines',
          params: {
            cuisineId: cuisineId
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted () {
    try {
      const cuisineId = this.$store.state.route.params.cuisineId
      this.cuisine = (await CuisineService.show(cuisineId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
</style>
