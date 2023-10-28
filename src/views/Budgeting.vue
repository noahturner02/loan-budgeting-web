<template>
    <v-container>
        <v-card class="mb-3">
            <v-card-title>Search</v-card-title>
        </v-card>
        <v-data-table v-model:page="page" v-model:items-per-page="itemsPerPage" :headers="headers" :items="items" class="elevation-1">
        </v-data-table>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { VContainer, VCard } from 'vuetify/components'
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import { getAllTransactions } from '../api/api'
import { useCustomerStore } from '../stores/customerStore'
export default defineComponent({
    name: 'Budgeting',
    components: {
    VContainer,
    VCard,
    VDataTable,
},
    data() {
        return {
            headers: [
                {
                    title: 'Merchant',
                    align: 'center',
                    key: 'merchant'
                },
                {
                    title: 'Date',
                    align: 'center',
                    key: 'transDate'
                },
                {
                    title: 'Category',
                    align: 'center',
                    key: 'transCategory'
                },
                {
                    title: 'Amount',
                    align: 'center',
                    key: 'transAmount'
                },
            ],
            items: [
                {
                    merchant: 'McDonalds',
                    transDate: '10:12:11 PM 10/24/23',
                    transCategory: 'Food',
                    transAmount: 14.43
                }
            ],
            page: 1,
            itemsPerPage: 10,
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.items.length / this.itemsPerPage);
        }
    },
    async mounted() {
        this.items = await this.getTransactions();
    },
    methods: {
        async getTransactions() {
            const customerStore = useCustomerStore();
            const transactionResponse = await getAllTransactions(customerStore.$state.username)
            if ('error' in transactionResponse) {
                console.log("couldn't load transactions");
            } else {
                return transactionResponse.data;
            }
        }
    }
});
</script>
<style lang="scss">

</style>