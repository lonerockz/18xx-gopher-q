<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon
            name="account_circle"
            color="primary"
          />
        </template>
        Login to access 18xx Gopher!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        @input="$v.$touch()"
        outlined
        lazy-rules
        class="col"
        v-model.trim="formData.email"
        label="Your Email..."
        :rules="[
          val => $v.formData.email.email || 'Invalid email format',
          val => $v.formData.email.required || 'Email is required',
        ]"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="$v.formData.password.$model"
        outlined
        lazy-rules
        class="col"
        :type="isPwd ? 'password' : 'text'"
        label="Enter A Password"
        :rules="[
          val => $v.formData.password.minLength|| 'Password must have at least ' +
            $v.formData.password.$params.minLength.min + 'letters.',
          val => $v.formData.password.required || 'Password is required.',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
    <div class="row q-mb-md">
      <q-space />
      <q-btn
        color="primary"
        label="Login"
        type="submit"
        :disable="$v.formData.$anyError"
      />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      isPwd: true,
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    submitForm () {
      console.log('this.$v.formData :', this.$v.formData)
      if (!this.$v.formData.email.$invalid && !this.$v.formData.password.$invalid) {
        this.loginUser(this.formData)
      }
    }
  },
  validations: {
    formData: {
      email: {
        required,
        email

      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  }
}
</script>
