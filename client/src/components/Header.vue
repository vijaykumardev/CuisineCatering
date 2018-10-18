<template>
    <v-toolbar fixed class="deep-orange" dark>
      <v-toolbar-title class="mr-4">
        <router-link tag="span" class="home" :to="{name: 'cuisines'}">
          Cuisine Catering
        </router-link>
      </v-toolbar-title>

      <v-toolbar-items>
      <v-btn :to="{name: 'cuisines'}" flat dark>
        Browse
      </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" :to="{name: 'login'}" flat dark>
          Login
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" :to="{name: 'register'}" flat dark>
          Sign Up
        </v-btn>
      </v-toolbar-items>
    <v-toolbar-items>
      <v-badge v-if="$store.state.isUserLoggedIn" left>
      <span slot="badge">6</span>
      <v-icon
        large
        color="grey lighten-1"
      >
        shopping_cart
      </v-icon>
    </v-badge>
      </v-toolbar-items>
    <v-toolbar-items>
        <v-btn v-if="$store.state.isUserLoggedIn" @click="logout" flat dark>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'cuisines'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: grey;
}
</style>
