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
        Register to access 18xx Gopher!
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
        @input="$v.$touch()"
        outlined
        lazy-rules
        class="col"
        v-model.trim="formData.username"
        label="Desired Username"
        :rules="[
          val => $v.formData.username.required || 'User Name is required',
          val => $v.formData.username.minLength|| 'Username must have at least ' +
            $v.formData.username.$params.minLength.min + ' letters.',
          val => $v.formData.username.maxLength|| 'Username must be less ' +
            $v.formData.username.$params.maxLength.max + ' letters.',
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
            $v.formData.password.$params.minLength.min + ' letters.',
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
      <q-input
        v-model="$v.formData.repeatPassword.$model"
        outlined
        lazy-rules
        class="col"
        :type="isPwd ? 'password' : 'text'"
        label="Repeat Password"
        :rules="[
          val => $v.formData.repeatPassword.sameAsPassword || 'Passwords must be identical.',
        ]"
      />
    </div>
    <div class="row q-mb-md">
      <q-space />
      <q-btn
        color="primary"
        label="Register"
        type="submit"
        :disable="$v.formData.$anyError"
      />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength, sameAs, maxLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      isPwd: true,
      formData: {
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser']),
    submitForm () {
      console.log('this.$v.formData :', this.$v.formData)
      if (!this.$v.formData.email.$invalid && !this.$v.formData.password.$invalid) {
        this.registerUser(this.formData)
      }
    }
  },
  filters: {
    titleCase (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  validations: {
    formData: {
      email: {
        required,
        email

      },
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  }
}
</script>
