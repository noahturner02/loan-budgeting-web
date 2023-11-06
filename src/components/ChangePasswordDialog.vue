<template>
    <v-card class="pa-5">
        <v-card-title class="text-xl-center">Change Password</v-card-title>
        <v-card-text class="d-flex" style="flex-direction: column;">
            <v-text-field v-model="verifyPassword" type="password" label="Verify Password"></v-text-field>
            <v-text-field v-model="newPassword" type="password" label="New Password"></v-text-field>
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
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ChangePasswordDialog',
    emits: ['closeForm'],
    setup() {
        const customerStore = useCustomerStore();
        return {customerStore};
    },
    data() {
        return {
            verifyPassword: '',
            newPassword: '',
        }
    },
    methods: {
        async submitAction() {
            console.log(this.customerStore.$state);
            // const customerResponse = await editCustomer({


            // })
            this.$emit('closeForm');
        }
    }
    
})
</script>