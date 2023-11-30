<template>
    <v-container class="d-flex justify-center">
        <v-card style="width: 80%">
            <v-card-title class="text-xl-center">Settings</v-card-title>
            <v-card-text class="d-flex" style="flex-direction: column; align-items: center;">
                <v-text-field v-model="firstName" :bg-color="(firstName != customerStore.$state.firstName) ? '#3f4a2d' : ''" persistent-placeholder :readonly="!editMode" label="First Name" style="width: 50%"></v-text-field>
                <v-text-field v-model="lastName" :bg-color="(lastName != customerStore.$state.lastName) ? '#3f4a2d' : ''" persistent-placeholder :readonly="!editMode" label="Last Name" style="width: 50%"></v-text-field>
                <v-text-field v-model="phoneNumber" :bg-color="(phoneNumber != customerStore.$state.phoneNumber) ? '#3f4a2d' : ''" persistent-placeholder :readonly="!editMode" label="Phone Number" style="width: 50%"></v-text-field>
                <v-text-field v-model="email" :bg-color="(email != customerStore.$state.email) ? '#3f4a2d' : ''" persistent-placeholder :readonly="!editMode" label="Email" style="width: 50%"></v-text-field>
                <v-text-field v-model="address" :bg-color="(address != customerStore.$state.address) ? '#3f4a2d' : ''" persistent-placeholder :readonly="!editMode" label="Address" style="width: 50%"></v-text-field>
                <div class="d-flex justify-center mb-3" style="gap: 50px">
                    <v-btn v-if="editMode" style="background-color: firebrick;" append-icon="mdi-delete" size="x-large" @click="cancelAction()">Cancel</v-btn>
                    <v-btn :loading="loading" style="background-color: darkgreen;" :append-icon="editMode ? 'mdi-check' : 'mdi-pencil'" size="x-large" @click="submitAction()">{{ editMode ? 'Submit' : 'Edit' }}</v-btn>
                </div>
                <v-btn size="large" type="text" elevation="0" @click="showPasswordDialog = true">Password Change</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
    <v-dialog v-model="showPasswordDialog" max-width="600">
        <ChangePasswordDialog @close-form="showPasswordDialog = false"></ChangePasswordDialog>
    </v-dialog>
</template>
<script>
import { useCustomerStore } from '@/stores/customerStore';
import { editCustomer } from '@/api/api';
import { defineComponent } from 'vue';
import ChangePasswordDialog from '@/components/ChangePasswordDialog.vue';
export default defineComponent({
    name: 'Settings',
    components: { ChangePasswordDialog },
    setup() {
        const customerStore = useCustomerStore();
        return { customerStore };
    },
    data() {
        return {
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            editMode: false,
            loading: false,
            showPasswordDialog: false,
        };
    },
    mounted() {
        this.resetFields();
    },
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        resetFields() {
            this.firstName = this.customerStore.$state.firstName;
            this.lastName = this.customerStore.$state.lastName;
            this.phoneNumber = this.customerStore.$state.phoneNumber;
            this.email = this.customerStore.$state.email;
            this.address = this.customerStore.$state.address;
            this.password = this.customerStore.$state.password;
        },
        cancelAction() {
            this.resetFields();
            this.toggleEditMode();
        },
        async submitAction() {
            if (this.editMode) {
                this.loading = true;
                const customerResponse = await editCustomer({
                    username: this.customerStore.$state.username,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    email: this.email,
                    address: this.address,
                    password: this.customerStore.$state.password,
                });
                this.loading = false;
                if ('error' in customerResponse) {
                    console.log(customerResponse);
                }
                else {
                    this.customerStore.$patch({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phoneNumber: this.phoneNumber,
                        email: this.email,
                        address: this.address,
                    });
                }
            }
            this.toggleEditMode();
        }
    }
})
</script>