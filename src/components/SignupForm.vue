<template>
  <v-container class="d-flex justify-center" style="row-gap: 50px">
    <v-card class="align-content-center pa-5" style="width: 40%">
      <v-form>
        <div
          class="d-flex justify-center"
          style="flex-direction: column; align-items: center"
        >
          <v-text-field class="formfield" label="First Name"></v-text-field>
          <v-text-field class="formfield" label="Last Name"></v-text-field>
          <v-text-field
            v-model="phoneNumber"
            class="formfield"
            label="Phone Number"
            type="number"
          ></v-text-field>
          <v-text-field
            class="formfield"
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            class="formfield"
            label="Re-Enter Password"
            type="password"
          ></v-text-field>
          <v-text-field class="formfield" label="Address"></v-text-field>
          <v-text-field
            class="formfield"
            label="Email"
            type="email"
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
              @click="$emit('create-account')"
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
export default {
  name: "SignupForm",
  components: {
    VForm,
    VTextField,
    VCard
  },
  emits: ["exit"],
  data() {
    return {
      phoneNumber: undefined
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
  }
};
</script>

<style lang="scss">
.formfield {
  width: 75%;
}
</style>
