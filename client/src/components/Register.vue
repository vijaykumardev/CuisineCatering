<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
    <panel title="Register">
            <form name="tab-tracker-form">
              <v-text-field v-model="email" label="Email" ></v-text-field>
              <br>
              <v-text-field v-model="firstname" label="First Name" ></v-text-field>
              <v-text-field v-model="lastname" label="Last Name" ></v-text-field>
              <br>
              <v-text-field v-model="address" label="Address" ></v-text-field>
              <br>
              <v-text-field v-model="phonenumber" label="Phone Number" ></v-text-field>
              <br>
              <v-text-field v-model="password" type="password" label="Password" autocomplete="new-password"></v-text-field>
              <br>
              <v-flex xs12 sm6 class="py-4" >
                <v-btn-toggle v-model="usertype" mandatory class="deep-orange-lighten-4" center>
                  <v-btn flat>
                    Customer
                  </v-btn>
                  <v-btn flat>
                    Caterer
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
              <div class="error" v-html="error"/>
              <br>
              <v-btn class="deep-orange" @click="register" dark>Register</v-btn>
            </form>
            </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      usertype: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  color: red;
}

</style>
