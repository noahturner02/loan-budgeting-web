<template>
    <v-card class="pa-5">
        <v-card-title class="text-lg-center">Delete Transaction</v-card-title>
        <v-card-text class="text-lg-center">Are you sure you want to delete this transaction?</v-card-text>
        <div class="d-flex justify-center" style="gap: 100px">
            <v-btn size="x-large" style="background-color: rgb(92, 92, 92);" @click="$emit('closeForm')">Cancel</v-btn>
            <v-btn size="x-large" style="background-color: firebrick;" @click="del(transID)">Delete</v-btn>
        </div>
    </v-card>
</template>
<script>
import { useCustomerStore } from '@/stores/customerStore';
import { defineComponent } from 'vue';
import { deleteTransaction } from '@/api/api';

    export default defineComponent({
        name: 'DeleteConfirmation',
        props: {
            transID: {
                type: Number,
                default: 0
            }
        },
        emits: ['closeForm'],
        setup() {
            const customerStore = useCustomerStore();
            return {customerStore};
        },
        methods: {
            async del(transID) {
                const transResponse = await deleteTransaction(this.customerStore.$state.username, transID);
                if (('error' in transResponse)) {
                    console.log('Could not delete transaction ' + transID);
                }
                this.$emit('closeForm');
            }
        }
    });
</script>