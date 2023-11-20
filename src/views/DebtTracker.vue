<template>
    <v-container>
        <v-card class="ma-5">
            <v-card-title class="text-lg-center">Credit Cards</v-card-title>
            <v-card-text>
                <div class="d-flex justify-center align-items-center" style="gap: 30%">
                    <v-select :items="cardDisplays" class="flex-child"></v-select>
                    <v-btn class="flex-child mt-2" style="background-color: darkgreen" text="Add New Credit Card" prepend-icon="mdi-plus"></v-btn>
                </div>
                <v-card class="ma-5" style="background-color: white">
                    <Line class="ma-5" :data="lineChartData" :options="lineChartOptions" />
                </v-card>
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
            lineChartData: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                {
                    label: "Outstanding Credit Card Balance",
                    backgroundColor: "rgba(133, 187, 101, 0.5)",
                    fill: true,
                    borderWidth: 10,
                    borderColor: '#85bb65',
                    tension: 0.05,
                    data: [5500.0, 5233.22, 4913.44, 4753.55, 4812.11, 4653.52],
                },
                ],
            },
            lineChartOptions: {
                responsive: true,
            }
        }
    },
    computed: {
        cardDisplays() {
            return this.cards.map((card) => 'XXXX XXXX XXXX ' + card.cardNumber.split(' ')[3])
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