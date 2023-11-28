<template>
    <v-container>
    <v-card class="pa-5">
        <v-card-title class="text-lg-center">{{ capitalizedAction }} Transaction</v-card-title>
        <div class="d-flex justify-center" style="flex-direction: column; align-items: center;">
            <v-text-field v-model="merchant" class="form-field" label="Merchant" hint="Who did you pay?" :error-messages="v$.merchant.$errors.map((e) => e.$message)" @blur="v$.merchant.$touch"></v-text-field>
            <v-text-field v-model="date" class="form-field" label="Transaction Date" type="date" hint="When did this transaction take place?" :error-messages="v$.date.$errors.map((e) => e.$message)" @blur="v$.date.$touch"></v-text-field>
            <v-select v-model="category" class="form-field" :items="categories" label="Category" :error-messages="v$.category.$errors.map((e) => e.$message)" @blur="v$.category.$touch"></v-select>
            <v-radio-group v-model="type" class="form-field" :error-messages="v$.type.$errors.map((e) => e.$message)" @blur="v$.type.$touch">
                <v-radio label="Income" value="income"></v-radio>
                <v-radio label="Spending" value="spending"></v-radio>
            </v-radio-group>
            <v-text-field v-model="amount" class="form-field" label="Amount" :hint="'Since transaction is ' + type + ', amount will be ' + posOrNeg" type="number" :error-messages="v$.amount.$errors.map((e) => e.$message)" @blur="v$.amount.$touch"></v-text-field>
        </div>
        <div class="d-flex justify-center" style="gap: 100px">
            <v-btn size="x-large" style="background-color: firebrick" @click="$emit('closeForm')">Cancel</v-btn>
            <v-btn size="x-large" style="background-color: darkgreen" @click="submit()">{{ (action === 'CREATE' ? 'Add' : 'Edit') }}</v-btn>
        </div>
    </v-card>
    </v-container>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { addNewTransaction, editTransaction } from '../api/api'
import { useCustomerStore } from '@/stores/customerStore';
export default {
    name: 'TransactionForm',
    props: {
        categories: {
            type: Array,
            default() {
                return [];
            }
        },
        action: {
            type: String,
            default: 'CREATE'
        },
        trans: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    emits: ['closeForm'],
    setup() {
        const customerStore = useCustomerStore();
        return { v$: useVuelidate(), customerStore }
    },
    data() {
        return {
            merchant: undefined,
            date: undefined,
            category: undefined,
            type: undefined,
            amount: undefined,
            signedAmount: undefined,
            fakeCardNumber: "4563 2456 4216 4322"
        }
    },
    computed: {
        posOrNeg() {
            return this.type === 'income' ? 'positive' : 'negative';
        },
        reformattedDate() {
            const pieces = this.date.split('-');
            return pieces[1] + '/' + pieces[2] + '/' + pieces[0];
        },
        JSDateFormat() {
            const pieces = this.trans.transDate.split('/');
            return pieces[2] + '-' + pieces[0] + '-' + pieces[1];
        },
        capitalizedAction() {
            return this.action.substring(0, 1) + this.action.substring(1).toLowerCase();
        }
    },
    mounted() {
        if (this.action === 'EDIT') {
            this.merchant = this.trans.merchant,
            this.date = this.JSDateFormat,
            this.category = this.trans.transCategory,
            this.type = 'Spending',
            this.amount = this.trans.transAmount
        }
    },
    validations() {
        return {
            merchant: { required },
            date: { required },
            category: { required },
            type: { required },
            amount: { required, minValue: minValue(0) }
        }
    },
    methods: {
        async submit() {
            const isFormCorrect = this.v$.$validate();
            if (isFormCorrect) {
                let transResponse = {};
                this.signedAmount = this.amount;
                if (this.type == 'Spending') {
                    this.signedAmount *= -1.0;
                }
                if (this.action === 'CREATE') {
                    transResponse = await addNewTransaction(this.customerStore.$state.username, {
                        cardNumber: this.fakeCardNumber,
                        merchant: this.merchant,
                        transDate: this.reformattedDate,
                        transCategory: this.category,
                        transAmount: this.signedAmount
                    });
                } else if (this.action === 'EDIT') {
                    transResponse = await editTransaction(this.customerStore.$state.username, {
                        transID: this.trans.transID,
                        merchant: this.merchant,
                        transDate: this.reformattedDate,
                        transCategory: this.category,
                        transAmount: this.signedAmount
                    })
                }
                if (!('error' in transResponse)) {
                    this.$emit('closeForm');
                } else {
                    console.log('uh oh...');
                }
            }
        }
    }
}
</script>
<style lang="scss">
.form-field {
    width: 75%
}
</style>