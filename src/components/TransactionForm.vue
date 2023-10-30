<template>
    <v-container>
    <v-card class="pa-5">
        <v-card-title class="text-lg-center">Add Transaction</v-card-title>
        <div class="d-flex justify-center" style="flex-direction: column; align-items: center;">
            <v-text-field v-model="merchant" class="form-field" label="Merchant" hint="Who did you pay?"></v-text-field>
            <v-text-field v-model="date" class="form-field" label="Transaction Date" type="date" hint="When did this transaction take place?"></v-text-field>
            <v-select v-model="category" class="form-field" label="Category"></v-select>
            <v-radio-group v-model="type" class="form-field">
                <v-radio label="Income" value="income"></v-radio>
                <v-radio label="Spending" value="spending"></v-radio>
            </v-radio-group>
            <v-text-field v-model="amount" class="form-field" label="Amount" :hint="'Since transaction is ' + type + ', amount will be ' + posOrNeg"></v-text-field>
        </div>
        <div class="d-flex justify-center" style="gap: 100px">
            <v-btn size="x-large" style="background-color: firebrick" @click="$emit('closeForm')">Cancel</v-btn>
            <v-btn size="x-large" style="background-color: darkgreen">Add</v-btn>
        </div>
    </v-card>
    </v-container>
</template>

<script>

export default {
    name: 'TransactionForm',
    emits: ['closeForm'],
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
    }
}
</script>
<style lang="scss">
.form-field {
    width: 75%
}
</style>