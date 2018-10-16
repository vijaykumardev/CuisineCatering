<template>
    <v-toolbar fixed class="deep-orange" dark>
      <v-toolbar-title class="mr-4">
        <span class="home" @click="navigateTo({name: 'root'})">
          Cuisine Catering
        </span>
      </v-toolbar-title>

      <v-toolbar-items>
      <v-btn @click="navigateTo({name: 'cuisines'})" flat dark>
        Browse
      </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'login'})" flat dark>
          Login
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'register'})" flat dark>
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
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
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
