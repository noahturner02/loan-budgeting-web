<template>
  <v-container class="d-flex justify-center" style="row-gap: 50px">
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
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            class="formfield"
            label="Last Name"
            :error-messages="v$.lastName.$errors.map((e) => e.$message)"
          ></v-text-field>
          <v-text-field
            v-model="phoneNumber"
            class="formfield"
            label="Phone Number"
            type="number"
            :error-messages="v$.phoneNumber.$errors.map((e) => e.$message)"
          ></v-text-field>
          <v-text-field
            v-model="password"
            class="formfield"
            label="Password"
            type="password"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
          ></v-text-field>
          <v-text-field
            v-model="verifyPassword"
            class="formfield"
            label="Re-Enter Password"
            type="password"
            :error-messages="v$.verifyPassword.$errors.map((e) => e.$message)"
          ></v-text-field>
          <v-text-field
            v-model="address"
            class="formfield"
            label="Address"
            :error-messages="v$.address.$errors.map((e) => e.$message)"
          ></v-text-field>
          <v-text-field
            v-model="email"
            class="formfield"
            label="Email"
            type="email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
          ></v-text-field>
          <div class="d-flex justify-center" style="gap: 40px">
            <v-btn
              size="x-large"
              style="background-color: firebrick; width: 250px"
              @click="$emit('exit')"
              >Cancel</v-btn
            >
            <v-btn
              size="x-large"
              style="background-color: darkgreen; width: 250px"
              @click="submitForm"
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
export default {
  name: "SignupForm",
  components: {
    VForm,
    VTextField,
    VCard
  },
  emits: ["exit"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
      password: undefined,
      verifyPassword: undefined,
      address: undefined,
      email: undefined
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
      password: {
        required,
        minLength: minLength(10)
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
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        console.log("Failed to submit. Validations failed!");
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