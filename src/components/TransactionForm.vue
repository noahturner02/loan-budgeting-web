<template>
    <v-container>
    <v-card class="pa-5">
        <v-card-title class="text-lg-center">Add Transaction</v-card-title>
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
            <v-btn size="x-large" style="background-color: darkgreen" @click="submit()">Add</v-btn>
        </div>
    </v-card>
    </v-container>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
export default {
    name: 'TransactionForm',
    props: {
        categories: Array
    },
    emits: ['closeForm'],
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            merchant: undefined,
            date: undefined,
            category: undefined,
            type: undefined,
            amount: undefined
        }
    },
    computed: {
        posOrNeg() {
            return this.type === 'income' ? 'positive' : 'negative';
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
        submit() {
            const isFormCorrect = this.v$.$validate();
            console.log(isFormCorrect);
        }
    }
}
</script>
<style lang="scss">
.form-field {
    width: 75%
}
</style>