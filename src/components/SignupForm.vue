<template>
  <v-container class="d-flex justify-center" style="row-gap: 50px" fluid>
    <v-card class="align-content-center pa-5" style="width: 40%">
      <v-card-title class="text-xl-center mb-3">Create Account</v-card-title>
      <v-form>
        <div
          class="d-flex justify-center"
          style="flex-direction: column; align-items: center"
        >
          <v-text-field
            v-model="firstName"
            class="formfield"
            label="First Name"
            :error-messages="v$.firstName.$errors.map((e) => e.$message)"
            @blur="v$.firstName.$touch"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            class="formfield"
            label="Last Name"
            :error-messages="v$.lastName.$errors.map((e) => e.$message)"
            @blur="v$.lastName.$touch"
          ></v-text-field>
          <v-text-field
            v-model="phoneNumber"
            class="formfield"
            label="Phone Number"
            type="number"
            :error-messages="v$.phoneNumber.$errors.map((e) => e.$message)"
            @blur="v$.phoneNumber.$touch"
          ></v-text-field>
          <v-text-field
            v-model="username"
            class="formfield"
            label="Username"
            :error-messages="v$.username.$errors.map((e) => e.$message)"
            @blur="v$.username.$touch"
          ></v-text-field>
          <v-text-field
            v-model="password"
            class="formfield"
            label="Password"
            type="password"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
            @blur="v$.password.$touch"
          ></v-text-field>
          <v-text-field
            v-model="verifyPassword"
            class="formfield"
            label="Re-Enter Password"
            type="password"
            :error-messages="v$.verifyPassword.$errors.map((e) => e.$message)"
            @blur="v$.verifyPassword.$touch"
          ></v-text-field>
          <v-text-field
            v-model="address"
            class="formfield"
            label="Address"
            :error-messages="v$.address.$errors.map((e) => e.$message)"
            @blur="v$.address.$touch"
          ></v-text-field>
          <v-text-field
            v-model="email"
            class="formfield"
            label="Email"
            type="email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            @blur="v$.email.$touch"
          ></v-text-field>
          <v-alert v-show="showAlert" density="comfortable" color="#DF5454" :text="alertText" class="mb-5"></v-alert>
          <div
            class="d-flex justify-center"
            style="gap: 40px; flex-wrap: wrap-reverse"
          >
            <v-btn
              size="x-large"
              style="background-color: firebrick; width: 250px"
              @click="$emit('exit')"
              >Cancel</v-btn
            >
            <v-btn
              size="x-large"
              style="background-color: darkgreen; width: 250px"
              :loading="loading"
              @click="signUp"
              >Create Account</v-btn
            >
          </div>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { VForm, VTextField, VCard } from "vuetify/lib/components/index.mjs";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useCustomerStore } from '../stores/customerStore'
import { customerRegister } from '../api/api'
import { helpers } from "@vuelidate/validators";
export default {
  name: "SignupForm",
  components: {
    VForm,
    VTextField,
    VCard
  },
  emits: ["exit"],
  setup() {
    const customerStore = useCustomerStore();
    return { v$: useVuelidate(), customerStore };
  },
  data() {
    return {
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
      username: undefined,
      password: undefined,
      verifyPassword: undefined,
      address: undefined,
      email: undefined,
      loading: false,
      alertText: '',
      showAlert: false,
    };
  },
  watch: {
    phoneNumber() {
      if (this.phoneNumber.length > 10) {
        this.$nextTick(() => {
          this.phoneNumber = this.phoneNumber.toString().slice(0, 10);
        });
      }
    }
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      phoneNumber: { required, minLength: minLength(10) },
      username: { required, minLength: minLength(5) },
      password: {
        required,
        minLength: minLength(8),
        valid: helpers.withMessage('Password must have at least one uppercase, one lowercase, one number, and one special character', function(value) {
          const containsuppercase = /[a-z]/.test(value)
          const containslowercase = /[a-z]/.test(value)
          const containsnumber = /[0-9]/.test(value)
          const containsspecial = /[#?!@$%^&*-]/.test(value)
          return containsuppercase && containslowercase && containsnumber && containsspecial
        })
      },
      verifyPassword: {
        required,
        sameAs: sameAs(this.password)
      },
      address: { required },
      email: { required, email }
    };
  },
  methods: {
    async signUp() {

      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        this.loading = true;
        const signUpResponse = await customerRegister({
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          username: this.username,
          password: this.password,
          address: this.address,
          email: this.email
        })
        if ('status' in signUpResponse && signUpResponse.status === 200) {
          this.customerStore.customerLogIn(signUpResponse.data);
          console.log("Account Successfully Created! Please proceed to login, " + this.firstName);
          this.$emit('exit');
        } else {
          this.alertText = 'Email address or username already in use';
          this.showAlert = true;
        }
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
.formfield {
  width: 75%;
}
</style>
