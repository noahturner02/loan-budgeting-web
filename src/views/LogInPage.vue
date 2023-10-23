<template>
  <v-container fluid class="d-flex justify-center">
    <v-card style="width: 50%">
      <v-card-title>Log In</v-card-title>
      <div
        class="d-flex justify-center"
        style="flex-direction: column; align-items: center"
      >
        <v-text-field
          v-model="username"
          class="formfield"
          label="Username"
          :error-messages="v$.username.$errors.map((e) => e.$message)"
        ></v-text-field>
        <v-text-field
          v-model="password"
          class="formfield"
          label="Password"
          type="password"
          :error-messages="v$.password.$errors.map((e) => e.$message)"
        ></v-text-field>
        <v-btn
          size="x-large"
          style="background-color: darkgreen; width: 37.5%"
          class="mb-5"
          @click="logIn"
          >Log In</v-btn
        >
        <div
          class="d-flex justify-space-between mb-5"
          style="width: 70%; flex-wrap: wrap-reverse"
        >
          <v-btn variant="text">Forgot Password?</v-btn>
          <v-btn variant="text" @click="toggleDialog">Create Account</v-btn>
        </div>
        <div class="d-flex justify-center mb-5">
          <v-alert v-show="showAlert" density="comfortable" color="#DF5454">Invalid Username / Password</v-alert>
        </div>
      </div>
    </v-card>
  </v-container>
  <v-dialog v-model="showDialog" persistent>
    <SignupForm @exit="showDialog = false"></SignupForm>
  </v-dialog>
</template>
<script>
import {
  VBtn,
  VDialog,
  VCard,
  VContainer,
  VTextField,
  VAlert
} from "vuetify/lib/components/index.mjs";
import SignupForm from "../components/SignupForm.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { customerLogin } from "@/api/api";
import {useCustomerStore} from '../stores/customerStore'

export default {
  name: "LogInPage",
  components: {
    VBtn,
    VDialog,
    SignupForm,
    VTextField,
    VCard,
    VContainer,
    VAlert
  },
  setup() {
    const customerStore = useCustomerStore();
    return { v$: useVuelidate(), customerStore };
    
  },
  data() {
    return {
      showDialog: false,
      username: undefined,
      password: undefined,
      showAlert: false,
    };
  },
  methods: {
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
    async logIn() {
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        console.log("Calling login API...");
        const loginResponse = await customerLogin(this.username, this.password);
        if ('status' in loginResponse && loginResponse.status === 200) {
          this.customerStore.customerLogIn(loginResponse.data);
          this.showAlert = false;
          console.log(this.customerStore.$state);
        } else {
          this.showAlert = true;
        }
      }
    },
  },
  validations() {
    return {
      username: { required },
      password: { required }
    };
  }
};
</script>
<style lang="scss">
.formfield {
  width: 75%;
}
</style>
