<template>
  <v-btn @click="toggleDialog">Create Account</v-btn>
  <v-dialog v-model="showDialog" persistent>
    <SignupForm @exit="showDialog = false"></SignupForm>
  </v-dialog>
</template>
<script>
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";
import SignupForm from "../components/SignupForm.vue";
export default {
  name: "LogInPage",
  components: {
    VBtn,
    VDialog,
    SignupForm
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    toggleDialog() {
      this.showDialog = !this.showDialog;
    }
  }
};
</script>
