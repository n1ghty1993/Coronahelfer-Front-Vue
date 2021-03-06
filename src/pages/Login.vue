<template>
  <q-page class="q-pa-md row justify-center items-center">
    <div class="form q-pa-xs">
      <div class="form-img row items-center justify-center q-ma-sm">
        <img src="statics/images/CoronaHelfer-Logo.svg" />
      </div>

      <div class="form-fields row">
        <div class="col-xs-12 col-md-3"></div>
        <q-form
          class="row items-center justify-between q-pa-lg col-xs-12 col-md-9"
        >
          <div v-if="error !== ''" class="error">{{ error }}</div>
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            :label="$t('emailOrPassword')"
            v-model="name"
          />
          <q-input
            bg-color="white"
            filled
            class="q-px-sm form-input col-xs-12 col-md-12"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('password')"
            v-model="password"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div class="row login-register">
            <q-btn
              color="primary"
              type="submit"
              bg-color="white"
              filled
              class="c-btn form-input col-xs-12 col-md-4"
              :loading="loading"
              :label="$t('login')"
              @click.prevent="login"
            ></q-btn>
            <q-btn
              class="c-link q-py-sm col-xs-12 col-md-8"
              flat
              :label="$t('orRegister')"
              to="/register"
            ></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.login-register
  width: 100%
.oauth
  background-color: #4285F4
  width: 100%
  padding: 0.5rem
  border-radius: 0
</style>

<script>
import { clone } from 'ramda'

export default {
  data() {
    return {
      showPassword: false,
      previousRoute: undefined,
      name: '',
      password: '',
      error: '',
      loading: false
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.previousRoute = from.fullPath
    })
  },

  computed: {
    auth() {
      return clone(this.$store.state.auth)
    }
  },

  methods: {
    async login() {
      this.loading = true

      if (this.name === '' || this.password === '') {
        this.error = this.$t('wrongLogin')
        return
      }

      let body = {
        email: this.name,
        password: this.password
      }

      if (this.name.indexOf('@') === -1) {
        body = {
          phone: this.name,
          password: this.password
        }
      }

      try {
        await this.$store.dispatch('auth/login', body)

        if (
          ['/help', '/get-help'].includes(this.previousRoute) ||
          this.previousRoute.startsWith('/verify')
        ) {
          this.$router.replace(this.previousRoute)
        } else {
          this.$router.replace('/profile')
        }
      } catch (error) {
        if (!error.response) {
          console.error(error)
          this.error = 'An unexpected error occurred!'
        }

        if (error.response.status === 404) {
          this.error = this.$t('unknownUser')
        }

        if (error.response.status === 401) {
          this.error = this.$t('wrongPassword')
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
