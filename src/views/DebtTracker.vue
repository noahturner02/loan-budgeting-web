<template>
    <v-container>
        <v-card class="ma-5">
            <v-card-title class="text-lg-center">Credit Cards</v-card-title>
            <v-card-text>
                <div class="d-flex justify-center align-items-center" style="gap: 30%">
                    <v-select v-model="currentCard" :items="cardDisplays" class="flex-child"></v-select>
                    <v-btn class="flex-child mt-2" style="background-color: darkgreen" text="Add New Credit Card" prepend-icon="mdi-plus"></v-btn>
                </div>
                <v-card class="ma-5" style="background-color: white">
                    <v-card-title class="text-h3 ma-5" style="color: #85bb65">{{ currentBalanceDollar }}</v-card-title>
                    <Line v-if="currentCard" ref="chart" class="ma-5" :data="chartData" :options="chartOptions" />
                </v-card>
                <div v-if="currentCard" class="d-flex justify-center" style="gap: 30px">
                    <v-btn size="x-large" @click="reloadDataDays(7)">1 Week</v-btn>
                    <v-btn size="x-large" @click="reloadDataDays(30)">1 Month</v-btn>
                    <v-btn size="x-large" @click="reloadDataMonths(3)">3 Months</v-btn>
                    <v-btn size="x-large" @click="reloadDataMonths(6)">6 Months</v-btn>
                    <v-btn size="x-large" @click="reloadDataMonths(12)">1 Year</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import { defineComponent } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "vue-chartjs";
import { getBalanceByDay, getBalanceByMonth, getCurrentBalance } from '@/api/api';
import { useCustomerStore } from '@/stores/customerStore';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
export default defineComponent({
    name: "DebtTracker",
    components: {
        Line,
    },
    setup() {
        const customerStore = useCustomerStore();
        return { customerStore };
    },
    data() {
        return {
            cards: [
                {
                    "cardNumber": "4563 2456 4216 4322",
                    "issuer": "Visa",
                    "interestRate": 0.02,
                    "creditLimit": 5500.0,
                    "currentBalance": 23101.19999999999,
                    "availableCredit": -17601.19999999999,
                    "minimumPayment": 45.0,
                    "dueDate": null,
                    "paymentDue": null,
                    "username": "fakeperson"
                }
            ],
            currentCard: undefined,
            cardMap: new Map(),
            numToMonthMap: new Map([[0, "Jan"], [1, "Feb"], [2, "Mar"], [3, "Apr"], [4, "May"], [5, "Jun"], [6, "Jul"], [7, "Aug"], [8, "Sep"], [9, "Oct"], [10, "Nov"], [11, "Dec"]]),
            currentBalance: 0
        }
    },
    computed: {
        cardDisplays() {
            return this.cards.map((card) => 'XXXX XXXX XXXX ' + card.cardNumber.split(' ')[3])
        },
        chartData() { return {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                {
                    label: "Outstanding Credit Card Balance",
                    backgroundColor: "rgba(133, 187, 101, 0.5)",
                    fill: true,
                    borderWidth: 10,
                    borderColor: '#85bb65',
                    tension: 0.05,
                    data: [10000, 1000, 100, 10, 1, 0],
                },
                ],
            } },
        chartOptions() { return {
                responsive: true,
            } },
        currentBalanceDollar() {
            if (this.currentBalance >= 0) {
                return "$" +  Number(this.currentBalance.toFixed(2));
            } else {
                return "- $" + Number((this.currentBalance * -1).toFixed(2));;
            }
        }
    },
    watch: {
        async currentCard() {
            const balanceResponse = await getCurrentBalance(this.cardMap.get(this.currentCard));
            if (!('error' in balanceResponse)) {
                this.currentBalance = balanceResponse.data;
            }
        }
    },
    mounted() {
        this.cards.map((card) => {this.cardMap.set(this.cardDisplays[this.cards.indexOf(card)], card.cardNumber)})
    },
    methods: {
        getMonthLabels(numOfMonths) {
            const date = new Date();
            let labels = [];
            for (let i = 0; i < numOfMonths; i++) {
                labels.unshift(this.numToMonthMap.get(date.getMonth()));
                date.setMonth(date.getMonth() - 1);
            }
            return labels;
        },
        getDayLabels(numOfDays) {
            const date = new Date();
            let labels = [];
            for (let i = 0; i < numOfDays; i++) {
                labels.unshift((date.getMonth() + 1) + "/" + date.getDate());
                date.setDate(date.getDate() - 1);
            }
            return labels;
        },
        async reloadDataDays(numOfDays) {
            console.log(this.cardMap.get(this.currentCard));
            const balanceResponse = await getBalanceByDay(this.customerStore.$state.username, this.cardMap.get(this.currentCard), numOfDays);
            if (!('error' in balanceResponse)) {
                this.$refs.chart.chart.data.datasets[0].data = balanceResponse.data.map((num) => num * -1)
                this.$refs.chart.chart.data.labels = this.getDayLabels(balanceResponse.data.length - 1);
            }
            this.$refs.chart.chart.update();
        },
        async reloadDataMonths(numOfMonths) {
            const balanceResponse = await getBalanceByMonth(this.customerStore.$state.username, this.cardMap.get(this.currentCard), numOfMonths);
            if (!('error' in balanceResponse)) {
                this.$refs.chart.chart.data.datasets[0].data = balanceResponse.data.map((num) => num * -1);
                this.$refs.chart.chart.data.labels = this.getMonthLabels(balanceResponse.data.length - 1);
            }
            this.$refs.chart.chart.update();
        }
    }
})
</script>
<style lang="scss">
iframe#webpack-dev-server-client-overlay{display:none!important}
.flex-child {
    flex: 1 1 0px;
    max-width: 15%;
}
</style>