<template>
    <v-card class="pa-5">
        <v-card-title class="text-xl-center">Change Password</v-card-title>
        <v-card-text class="d-flex" style="flex-direction: column;">
            <v-text-field v-model="verifyPassword" type="password" label="Verify Password" :error-messages="v$.verifyPassword.$errors.map((e) => e.$message)" @blur="v$.verifyPassword.$touch"></v-text-field>
            <v-text-field v-model="newPassword" type="password" label="New Password" :error-messages="v$.newPassword.$errors.map((e) => e.$message)" @blur="v$.newPassword.$touch"></v-text-field>
            <div class="d-flex justify-center" style="gap: 100px">
                <v-btn style="background-color: firebrick" size="x-large" @click="$emit('closeForm')">Cancel</v-btn>
                <v-btn style="background-color: darkgreen" size="x-large" @click="submitAction()">Submit</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
import { editCustomer } from '@/api/api';
import { useCustomerStore } from '@/stores/customerStore';
import useVuelidate from '@vuelidate/core';
import { required, minLength, sameAs, helpers } from '@vuelidate/validators';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ChangePasswordDialog',
    emits: ['closeForm'],
    setup() {
        const customerStore = useCustomerStore();
        const v$ = useVuelidate();
        return {customerStore, v$};
    },
    data() {
        return {
            verifyPassword: '',
            newPassword: '',
        }
    },
    validations() {
        return {
            verifyPassword: {
                required,
                sameAs: sameAs(this.oldPassword)
            },
            newPassword: {
                required,
                minLength: minLength(8),
                valid: helpers.withMessage('Password must have at least one uppercase, one lowercase, one number, and one special character', function(value) {
                    const containsuppercase = /[a-z]/.test(value)
                    const containslowercase = /[a-z]/.test(value)
                    const containsnumber = /[0-9]/.test(value)
                    const containsspecial = /[#?!@$%^&*-]/.test(value)
                    return containsuppercase && containslowercase && containsnumber && containsspecial
                })
            }
        }
    },
    computed: {
        oldPassword() {
            return this.customerStore.$state.password;
        }
    },
    methods: {
        async submitAction() {
            const isFormCorrect = await this.v$.$validate();
            if (isFormCorrect) {
                const customerData = this.customerStore.$state;
                this.v$.$reset();
                customerData.password = this.newPassword;
                const customerResponse = await editCustomer(customerData);
                if ('error' in customerResponse) {
                    console.log('unsuccessfully');
                }
                this.$emit('closeForm');
            }
        }
    }
    
})
</script>