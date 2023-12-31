<template>
    <v-container>
        <v-card class="mb-3">
            <v-card-title>Search</v-card-title>
            <v-form class="d-flex justify-center pa-5">
                    <v-text-field v-model="merchantSearch" class="mr-5 flex-child" label="Merchant"></v-text-field>
                    <v-text-field v-model="startDateSearch" class="mr-5 flex-child" label="Start Date" type="date"></v-text-field>
                    <v-text-field v-model="endDateSearch" class="mr-5 flex-child" label="End Date" type="date"></v-text-field>
                    <v-select v-model="categorySearch" class="mr-5 flex-child" label="Categories" :items="categories" chips multiple></v-select>
                    <v-text-field v-model="maxAmountSearch" class="mr-5 flex-child" label="Max Amount" type="number"></v-text-field>
                    <v-text-field v-model="minAmountSearch" class="flex-child" label="Min Amount" type="number"></v-text-field>

            </v-form>
            <v-btn style="background-color: darkgreen" append-icon="mdi-plus" class="mb-5" @click="showCreatePopUp()">Add New Transaction</v-btn>
        </v-card>
        <v-data-table v-model:page="page" v-model:items-per-page="itemsPerPage" :loading="loading" :headers="headers" :items="filteredItems" class="elevation-1" multi-sort>
            <template #[`item.actions`]="{ item }">
                <v-icon @click="showEditPopUp(item)">mdi-pencil</v-icon>
                <v-icon @click="showDeleteDialog(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="showForm" persistent>
            <TransactionForm :trans="editTransaction" :action="formAction" :categories="categories" @close-form="refreshTable()"></TransactionForm>
        </v-dialog>
        <v-dialog v-model="deleteDialog" persistent max-width="600">
            <DeleteConfirmation :trans-i-d="deleteID" @close-form="refreshTable()"></DeleteConfirmation>
        </v-dialog>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { VContainer, VCard } from 'vuetify/components'
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import { getAllTransactions } from '../api/api'
import { useCustomerStore } from '../stores/customerStore'
import TransactionForm from '../components/TransactionForm.vue'
import DeleteConfirmation from '../components/DeleteConfirmation.vue'
export default defineComponent({
    name: 'Transaction',
    components: {
    VContainer,
    VCard,
    VDataTable,
    TransactionForm,
    DeleteConfirmation
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
                {
                    title: 'Actions',
                    align: 'center',
                    key: 'actions',
                    sortable: false
                }
            ],
            items: [],
            page: 1,
            itemsPerPage: 10,
            categories: [
                'Home & Utilities',
                'Transportation',
                'Groceries',
                'Personal & Family Care',
                'Health',
                'Insurance',
                'Restaurants & Dining',
                'Shopping & Entertainment',
                'Travel',
                'Cash, Checks, & Misc',
                'Giving',
                'Business Expenses',
                'Education',
                'Finance',
                'Other'
            ],
            merchantSearch: '',
            startDateSearch: '',
            endDateSearch: '',
            categorySearch: [],
            minAmountSearch: '',
            maxAmountSearch: '',
            showForm: false,
            deleteDialog: false,
            formAction: 'CREATE',
            editTransaction: {},
            loading: false,
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.items.length / this.itemsPerPage);
        },
        reformatStartDate() {
            let pieces = this.startDateSearch.split('-');
            return pieces[1] + '/' + pieces[2] + '/' + pieces[0];
        },
        reformatEndDate() {
            let pieces = this.endDateSearch.split('-');
            return pieces[1] + '/' + pieces[2] + '/' + pieces[0];
        },
        filteredItems() {
            let filteredItems = JSON.parse(JSON.stringify(this.items));
            if (this.merchantSearch) {
                filteredItems = filteredItems.filter((tran) => {
                    return tran.merchant.includes(this.merchantSearch);
                })
            }
            if (this.startDateSearch) {
                filteredItems = filteredItems.filter((tran) => {
                    const stat = this.compareMMDDYYYDates(tran.transDate, this.reformatStartDate);
                    console.log(stat)
                    return (stat !== -1)
                })
            }
            if (this.endDateSearch) {
                filteredItems = filteredItems.filter((tran) => {
                    return (this.compareMMDDYYYDates(tran.transDate, this.reformatEndDate) !== 1);
                })
            }
            if (this.categorySearch.length > 0) {
                filteredItems = filteredItems.filter((tran) => {
                    return this.categorySearch.includes(tran.transCategory);
                })
            }
            if (this.maxAmountSearch) {
                filteredItems = filteredItems.filter((tran) => {
                    return tran.transAmount <= this.maxAmountSearch;
                })
            }
            if (this.minAmountSearch) {
                filteredItems = filteredItems.filter((tran) => {
                    return tran.transAmount >= this.minAmountSearch
                })
            }
            return filteredItems;
        },
    },
    async mounted() {
        this.loading = true;
        this.items = await this.getTransactions();
        this.loading = false
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
        },
        compareMMDDYYYDates(firstDate, secondDate) {
            let firstPieces = firstDate.split('/');
            let secondPieces = secondDate.split('/');
            if (firstPieces[2] === secondPieces[2]) {
                if (firstPieces[0] === secondPieces[0]) {
                    if (firstPieces[1] === secondPieces[1]) {
                        return 0;
                    } else if (firstPieces[1] > secondPieces[1]) {
                        return 1;
                    }
                    return -1;
                } else if (firstPieces[0] > secondPieces[0]) {
                    return 1;
                }
                return -1;
            } else if (firstPieces[2] > secondPieces[2]) {
                return 1;
            }
            return -1;
        },
        async refreshTable() {
            this.showForm = false;
            this.deleteDialog = false;
            const customerStore = useCustomerStore();
            const transResponse = await getAllTransactions(customerStore.$state.username);
            if (!('error' in transResponse)) {
                Object.assign(this.items, transResponse.data);
            }
        },  
        showEditPopUp(transaction) {
            this.formAction = 'EDIT';
            this.editTransaction = transaction;
            this.showForm = true;
        },
        showCreatePopUp() {
            this.formAction = 'CREATE'
            this.showForm = true;
        },
        showDeleteDialog(transaction) {
            this.deleteID = transaction.transID;
            this.deleteDialog = true;
        }
    }
});
</script>
<style lang="scss">
iframe#webpack-dev-server-client-overlay{display:none!important}
.flex-child {
    flex: 1 1 0px;
}
</style>