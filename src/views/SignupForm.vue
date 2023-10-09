<template>
  <v-container>
    <v-form>
      <div class="d-flex align-content-left">
        <v-card class="pa-4" style="background-color: blueviolet"
          >Save money for new dog</v-card
        >
      </div>
    </v-form>
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
  }
};
</script>

<style lang="scss">
v-text-field {
  width: 50%;
}
</style>
